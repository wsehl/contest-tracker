const admin = require("firebase-admin");

const config = {
  type: "service_account",
  project_id: "contest-tracker-87dc8",
  private_key_id: "db136c7b31cd8d9ee9bcf100a4151c30b57ae931",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDftXTHKxbBvAzc\nn7T//KQogZSTHGdlzTkMNvzHo3jfB/IGp3ZhSanjxCPYv0m94uSqU9vdoV02i9Z4\nSsobbxJAeIRwZPnOJJpRzM4m3nkhvcSlf4brIcDkHVUHe5PVhAg3KeX9qO+rfL24\nsyTzy8IIe5v/4wMdXfIsHHfaqP8DT58kqYCR6jlZS6Wign3j9SsbzFPzm3m7a1ek\n8Tl6enITFkM7wYQfRACvs2OFlnSU0V/a6vRmvhb2Qwu0V3uqBW3SJN2v3ckL1peN\nYyOmel6wUQLEOy2RjAFUUY8Cuvq1ba+YrZjvcdzpNbzk3BU8J5QT6C1MLFRhXa2L\ntuc3Eq7XAgMBAAECggEAHiYgqIg9weWrv2llWwExHSW8NfNPBWDvaPOu2jeayPFo\n2c1kiTSvSRCcWtAKNSVzTHfkGsNuLOATCxUxQG9Aq3Wn4P81d2W8HSgX5GnOiLtA\nLvm333p7ZNgwfG4C0h9q0rG6hZa97i5FN14qrbyZLXbTOFzfhOwDVj85RpEeBSj2\nV2pHT3Y0nRM0N+hw3xwiWIoLW0lsmiGltxaKGZUJQftsy/9BC2AJ1PYCgkrn6t9d\npam+Xt0XkKcTTieR9O4gO84uAppY1s+m9mh03LgwH/UpsCiAQAhs7AS3P9d1LxAd\n0qYwIhbBu9hB2bC4DNwChlkAei7ppkQedTmMs6DmyQKBgQD4b5cMtP6j1sv7BhZ6\nKoQpSZ7hZ+O9YnyikXdnEAMYwMj1kOyqtvbpo/IvWQplINdQBU7PszLI5QVfgfsh\nppXWuINftxVlI9LmoDJBYvugLL+il22ZOdtIB9q0K8ufz4Re6Igd8jgk3hu7q5Px\nf3vi6fMkfi4IAaPPjrUOKyjAjQKBgQDmhSIaOzrw8BMhcaGpU0pgg0y0kArxi/KM\nIPcvCXEXyYYoa3XbQPx3/TgBx9pXVz667baxLkyPgwtMiCYIFsaYwRTEuCqJufQf\nllds3yZMRcFOjYc48ulIi85DmiJY+szp7QDycfpVzDmY0su1FjOoDWvWQB9nRCsn\n6G2VxL/N8wKBgAdjYi2ZkF0U/Tn442A8tXN44gW4DjjKngRDqTZiboUk7pUG+1LU\nYCFwo7ouvrVlNaIGlmJs5Ny+mttNRUep6ZjaIeYNztAUMah0KSpypCMOUaCnOjYt\nV00cFq/3AXY+OKSN68ZgNrU5+b8qChtLfEaySG3UZtAMJG/+wXmrZOndAoGBAOVI\nLEhM+24kS9Lq8/G4L3VZg1ThJJFmMkRgkZuOV5diUXcok1wWAkfSa/+RacGPvIwu\n3pTSyUHBBN8FWFaZWMUc3uxfhafhdkhov+JA/hXFF+Vq7cGeEpyeufURfPJl2qUd\nn+CFr4nhDLTNjeI7B/wyBT1gIBwVeJtEGqNpw6EzAoGAcOY5ha2kULh0aliuuJLS\nTwb1q1Nbl0N6r0CzMf1AQ4/z0Ho5gS9hO12eAWJLVWAhq/NwOqCTHYgjgC0hcHyV\nL6MNyi3ue/68USUrZsabBHjJURVLIilmVQdY2Bx9j9mSGUBRn00up/4YMriXH8HC\n3sjCjmWmzmPuybqvrNG0Yzs=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-rz37l@contest-tracker-87dc8.iam.gserviceaccount.com",
  client_id: "112702578011201634654",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rz37l%40contest-tracker-87dc8.iam.gserviceaccount.com",
};

admin.initializeApp({
  credential: admin.credential.cert(config),
  storageBucket: "contest-tracker-87dc8.appspot.com",
});

const bucket = admin.storage().bucket();
const db = admin.firestore();

console.log("[module] Firebase succesfully connected");

module.exports = { bucket, db };
