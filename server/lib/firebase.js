const admin = require("firebase-admin");
const acc = require("./firebase-config.json");

admin.initializeApp({
  credential: admin.credential.cert(acc),
  storageBucket: "contest-tracker-87dc8.appspot.com",
});

const bucket = admin.storage().bucket();
module.exports = {
  bucket,
};
