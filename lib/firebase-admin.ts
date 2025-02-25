import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKey) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not defined');
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(serviceAccountKey);
} catch (error) {
  console.error('Error parsing Firebase service account:', error);
  throw new Error('Invalid FIREBASE_SERVICE_ACCOUNT_KEY format');
}

if (!getApps().length) {
  try {
    initializeApp({
      credential: cert(serviceAccount)
    });
  } catch (error) {
    console.error('Error initializing Firebase admin:', error);
    throw error;
  }
}

const adminDb = getFirestore();

export { adminDb }; 