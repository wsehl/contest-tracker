const firebaseAdmin = require("firebase-admin");
const firebaseConfing = require("~root/firebase.json");

const logger = require("~services/logger");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseConfing),
  storageBucket: "contest-tracker-87dc8.appspot.com",
});

const bucket = firebaseAdmin.storage().bucket();
const db = firebaseAdmin.firestore();

logger.module("Firebase", true);

module.exports = { bucket, db };
