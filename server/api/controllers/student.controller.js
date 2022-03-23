const logger = require("~services/logger");
const firebase = require("~config/firebase.js");

exports.addNew = async (req, res) => {
  const { grade_id, first_name, middle_name, last_name, study_lang } = req.body;

  const newStudent = {
    grade_id,
    first_name,
    middle_name,
    last_name,
    study_lang,
  };

  await firebase.db.collection("students").add(newStudent);

  logger.info(`Added student: [${newStudent.name}]`);

  res.status(201).send({
    msg: "Successfully added student",
    status: 201,
  });
};

exports.getAll = async (req, res) => {
  const students = [];
  const snapshot = await firebase.db.collection("students").get();

  snapshot.forEach(async (doc) => {
    const project = doc.data();
    project.id = doc.id;

    students.push(project);
  });

  await Promise.all(
    students.map((student) =>
      firebase.db
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
  const doc = await firebase.db.collection("students").doc(studentId).get();

  if (!doc.exists) {
    return res.status(404).send({
      msg: "Not Found",
      status: 404,
    });
  }

  const student = doc.data();
  const grade = await firebase.db
    .collection("grades")
    .doc(student.grade_id)
    .get();
  const curator = await firebase.db
    .collection("curators")
    .doc(grade.curator_id)
    .get();
  student.grade = grade.data();
  student.grade.curator = curator.data();

  return res.status(200).send({ data: student });
};

exports.removeOne = async (req, res) => {
  const id = req.params.id;
  await firebase.db.collection("students").doc(id).delete();
  res.status(200).send({ msg: "Ученик удалён" });
};

exports.updateOne = async (req, res) => {
  const id = req.params.id;

  const { first_name, middle_name, last_name, grade_id, study_lang } = req.body;

  const doc = await firebase.db.collection("students").doc(id).get();

  const newData = {
    ...doc.data(),
    first_name,
    middle_name,
    last_name,
    grade_id,
    study_lang,
  };

  await firebase.db.collection("students").doc(id).set(newData);

  res.status(200).send({ msg: "Ученик обновлён" });
};
