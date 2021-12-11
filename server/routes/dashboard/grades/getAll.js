const { db } = require("~libs/firebase.js");

const getAll = async (req, res) => {
  const grades = [];
  const snapshot = await db.collection("grades").get();

  snapshot.forEach(async (doc) => {
    const grade = doc.data();
    grade.id = doc.id;

    grades.push(grade);
  });

  await Promise.all(
    grades.map((grade) =>
      db
        .collection("curators")
        .doc(grade.curator_id)
        .get()
        .then((curator) => {
          grade.curator = curator.data();
        })
    )
  );

  res.status(200).send({ data: grades });
};

module.exports = getAll;
