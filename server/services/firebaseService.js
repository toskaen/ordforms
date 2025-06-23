const admin = require('firebase-admin');

let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch {
    serviceAccount = undefined;
  }
} else {
  try {
    serviceAccount = require('../../firebase-adminsdk.json');
  } catch {
    serviceAccount = undefined;
  }
}

const adminConfig = {};
if (serviceAccount && serviceAccount.private_key && serviceAccount.client_email) {
  adminConfig.credential = admin.credential.cert(serviceAccount);
}
if (process.env.FIREBASE_BUCKET) {
  adminConfig.storageBucket = process.env.FIREBASE_BUCKET;
}
admin.initializeApp(adminConfig);

const db = admin.firestore();
let storage;
if (process.env.FIREBASE_BUCKET) {
  storage = admin.storage().bucket();
}

module.exports = { db, storage };
