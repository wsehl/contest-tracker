const logger = require("~services/logger");
const { db } = require("~config/firebase.js");

exports.addNew = async (req, res) => {
  const { grade_id, first_name, middle_name, last_name, study_lang } = req.body;

  const newStudent = {
    grade_id,
    first_name,
    middle_name,
    last_name,
    study_lang,
  };

  await db.collection("students").add(newStudent);

  logger.info(`Added student: [${newStudent.name}]`);

  res.status(201).send({
    msg: "Successfully added student",
    status: 201,
  });
};

exports.getAll = async (req, res) => {
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

exports.getOne = async (req, res) => {
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
