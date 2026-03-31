import { Handler } from '@netlify/functions';
import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const dbId = process.env.VITE_FIREBASE_DATABASE_ID;

  // 1. Säker initiering (Cold Start)
  try {
    if (admin.apps.length === 0) {
      if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        if (serviceAccount.private_key) {
          serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
        }
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          projectId: serviceAccount.project_id
        });
      } else {
        admin.initializeApp();
      }
      // Anslut till specifik named database om den finns
      const db = dbId ? getFirestore(admin.app(), dbId) : getFirestore(admin.app());
      db.settings({ preferRest: true });
    }
  } catch (initError: any) {
    console.error('Firebase init error:', initError);
    return { statusCode: 500, body: JSON.stringify({ error: 'Firebase Init Error: ' + initError.message }) };
  }

  // 2. Affärslogiken
  try {
    // 2.1 Kontrollera Cloudflare Kill Switch via KV REST API (Fail-safe design)
    try {
      if (process.env.CF_ACCOUNT_ID && process.env.CF_KV_NAMESPACE_ID && process.env.CF_API_TOKEN) {
        const kvResponse = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/storage/kv/namespaces/${process.env.CF_KV_NAMESPACE_ID}/values/SYSTEM_STATUS`,
          {
            headers: {
              "Authorization": `Bearer ${process.env.CF_API_TOKEN}`
            }
          }
        );
        
        if (kvResponse.ok) {
          const status = await kvResponse.text();
          if (status === 'LOCKED') {
            return {
              statusCode: 403,
              body: JSON.stringify({ error: "Systemet är tillfälligt låst på grund av bandbreddsbegränsningar. Försök igen nästa månad." })
            };
          }
        } else if (kvResponse.status !== 404) {
          // Om nyckeln inte finns (404) är det OK, men andra fel bör låsa systemet (Fail-safe)
          throw new Error(`KV API svarade med status ${kvResponse.status}`);
        }
      }
    } catch (kvError) {
      console.error("Kunde inte verifiera SYSTEM_STATUS i KV", kvError);
      // Fail-closed: Lås systemet om vi inte kan verifiera statusen
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Kunde inte verifiera systemets säkerhetsstatus (Kill Switch). Åtkomst nekad för säkerhets skull." })
      };
    }

    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized: Missing token' }) };
    }
    const token = authHeader.split('Bearer ')[1];

    try {
      await admin.auth().verifyIdToken(token);
    } catch (error) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden: Invalid token' }) };
    }

    if (!event.body) return { statusCode: 400, body: JSON.stringify({ error: 'Missing body' }) };
    const body = JSON.parse(event.body);
    const orgId = body.orgId;
    if (!orgId) return { statusCode: 400, body: JSON.stringify({ error: 'Missing orgId' }) };

    // Hämta från rätt databas
    const db = dbId ? getFirestore(admin.app(), dbId) : getFirestore(admin.app());
    const docRef = db.doc(`organizations/${orgId}/secrets/api_keys`);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Credentials not found' }) };
    }

    const data = docSnap.data();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        geminiKey: data?.geminiKey || null,
        sfuKey1: data?.sfuKey1 || null,
        sfuKey2: data?.sfuKey2 || null
      })
    };
  } catch (error: any) {
    console.error('Runtime error:', error?.code, error?.message);
    return { statusCode: 500, body: JSON.stringify({ error: `Runtime Error: ${error?.code || ''} ${error?.message || 'Unknown error'}` }) };
  }
};
