const firebaseAdmin = require("firebase-admin");

const firebaseConfing = require("../../firebase.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseConfing),
  storageBucket: "contest-tracker-87dc8.appspot.com",
});

const bucket = firebaseAdmin.storage().bucket();
const db = firebaseAdmin.firestore();

console.log("[module] Firebase succesfully connected");

module.exports = { bucket, db };
