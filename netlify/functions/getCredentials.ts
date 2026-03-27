import { Handler } from '@netlify/functions';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK if it hasn't been initialized yet
if (admin.apps.length === 0) {
  try {
    // If FIREBASE_SERVICE_ACCOUNT is provided as an environment variable, use it.
    // Otherwise, fallback to default initialization (which uses GOOGLE_APPLICATION_CREDENTIALS).
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    } else {
      admin.initializeApp();
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

export const handler: Handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Security 1: Read Authorization header (Bearer token)
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized: Missing or invalid token' })
      };
    }

    const token = authHeader.split('Bearer ')[1];

    // Security 2: Verify token via admin.auth().verifyIdToken()
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(token);
    } catch (error) {
      console.error('Token verification failed:', error);
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Forbidden: Invalid token' })
      };
    }

    // Read orgId from request body
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Bad Request: Missing body' })
      };
    }

    let body;
    try {
      body = JSON.parse(event.body);
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Bad Request: Invalid JSON body' })
      };
    }

    const orgId = body.orgId;
    if (!orgId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Bad Request: Missing orgId' })
      };
    }

    // Use Firebase Admin SDK to fetch the document organizations/${orgId}/secrets/api_keys
    const db = admin.firestore();
    const docRef = db.doc(`organizations/${orgId}/secrets/api_keys`);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Not Found: Credentials not found for this organization' })
      };
    }

    const data = docSnap.data();

    // Return the keys (geminiKey, sfuKey1, sfuKey2) with status 200
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        geminiKey: data?.geminiKey || null,
        sfuKey1: data?.sfuKey1 || null,
        sfuKey2: data?.sfuKey2 || null
      })
    };

  } catch (error: any) {
    console.error('Error in getCredentials function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
