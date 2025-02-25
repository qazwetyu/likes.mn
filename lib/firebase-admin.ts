import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let serviceAccount;
try {
  serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}'
  );
} catch (error) {
  console.error('Error parsing Firebase service account:', error);
  serviceAccount = {};
}

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}

const adminDb = getFirestore();

export { adminDb }; 