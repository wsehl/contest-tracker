const { db } = require("~libs/firebase.js");

const getAll = async (req, res) => {
  const subjects = [];
  const snapshot = await db.collection("subjects").get();

  snapshot.forEach(async (doc) => {
    const subject = doc.data();
    subject.id = doc.id;

    subjects.push(subject);
  });

  res.status(200).send({ data: subjects });
};

module.exports = getAll;
