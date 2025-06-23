const admin = require('firebase-admin');
let serviceAccount = undefined;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  try {
    serviceAccount = require('../../firebase-adminsdk.json');
  } catch {
    serviceAccount = {};
  }
}

if (serviceAccount && Object.keys(serviceAccount).length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_BUCKET
  });
} else {
  admin.initializeApp();
}

const db = admin.firestore();
let storage;
if (process.env.FIREBASE_BUCKET) {
  storage = admin.storage().bucket();
}

module.exports = { db, storage };
