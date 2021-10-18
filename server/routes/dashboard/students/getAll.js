const { db } = require("../../../lib/firebase.js");

const getAll = async (req, res) => {
  const students = [];
  const snapshot = await db.collection("students").get();

  snapshot.forEach(async (doc) => {
    const project = doc.data();
    project.id = doc.id;

    students.push(project);
  });

  await Promise.all(
    students.map((student) =>
      db
        .collection("grades")
        .doc(student.grade_id)
        .get()
        .then((grade) => {
          student.grade = grade.data();
        })
    )
  );

  res.status(200).send({ data: students });
};

module.exports = getAll;
