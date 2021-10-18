const { db } = require("../../../lib/firebase.js");

const getAll = async (req, res) => {
  const grades = [];
  const snapshot = await db.collection("grades").get();

  snapshot.forEach(async (doc) => {
    const grade = doc.data();
    grade.id = doc.id;

    grades.push(grade);
  });

  res.status(200).send({ data: grades });
};

module.exports = getAll;
