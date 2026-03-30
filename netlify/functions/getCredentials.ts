import { Handler } from '@netlify/functions';
import * as admin from 'firebase-admin';

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  // 1. Säker initiering med fix för Netlify radbrytningar
  try {
    if (admin.apps.length === 0) {
      if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        // FIXEN: Tvinga tillbaka bokstavliga \n till faktiska radbrytningar
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
    }
  } catch (initError: any) {
    console.error('Firebase init error:', initError);
    return { statusCode: 500, body: JSON.stringify({ error: 'Firebase Init Error: ' + initError.message }) };
  }

  // 2. Själva affärslogiken
  try {
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

    const db = admin.firestore();
    // FIX: Tvinga Firebase att använda HTTP REST istället för gRPC för att överleva i Netlify Lambda
    db.settings({ preferRest: true });
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
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: `Runtime Error: ${error?.code || ''} ${error?.message || 'Unknown error'}` }) 
    };
  }
};
