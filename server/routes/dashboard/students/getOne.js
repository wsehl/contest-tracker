const { db } = require("~libs/firebase.js");

const getOne = async (req, res) => {
  const studentId = req.params.id;
  const doc = await db.collection("students").doc(studentId).get();

  if (!doc.exists) {
    return res.status(404).send({
      msg: "Not Found",
      status: 404,
    });
  }

  const student = doc.data();
  const grade = await db.collection("grades").doc(student.grade_id).get();
  const curator = await db.collection("curators").doc(grade.curator_id).get();
  student.grade = grade.data();
  student.grade.curator = curator.data();

  return res.status(200).send({ data: student });
};

module.exports = getOne;
