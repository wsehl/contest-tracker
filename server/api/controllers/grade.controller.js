const logger = require("~services/logger");
const firebase = require("~config/firebase.js");

exports.addNew = async (req, res) => {
  const { name, curator_id, study_lang } = req.body;

  const newGrade = { name, curator_id, study_lang };

  await firebase.db.collection("grades").add(newGrade);

  logger.info(`Added grade: [${newGrade.name}]`);

  res.status(201).send({
    msg: "Successfully added grade",
    status: 201,
  });
};

exports.getAll = async (req, res) => {
  const grades = [];
  const snapshot = await firebase.db.collection("grades").get();

  snapshot.forEach(async (doc) => {
    const grade = doc.data();
    grade.id = doc.id;

    grades.push(grade);
  });

  await Promise.all(
    grades.map((grade) =>
      firebase.db
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

exports.getOne = async (req, res) => {
  const gradeId = req.params.id;
  const doc = await firebase.db.collection("grades").doc(gradeId).get();

  if (!doc.exists) {
    return res.status(404).send({
      msg: "Not Found",
      status: 404,
    });
  }
  const grade = doc.data();
  const [curator, students] = await Promise.all([
    firebase.db.collection("curators").doc(grade.curator_id).get(),
    firebase.db.collection("students").where("grade_id", "==", gradeId).get(),
  ]);

  grade.curator = curator.data();
  grade.students = students.docs.map((doc) => doc.data());

  return res.status(200).send({ data: grade });
};

exports.removeOne = async (req, res) => {
  const gradeId = req.params.id;
  await firebase.db.collection("grades").doc(gradeId).delete();
  res.status(200).send({ msg: "Класс удалён" });
};

exports.updateOne = async (req, res) => {
  const id = req.params.id;

  const { name, curator_id, study_lang } = req.body;

  const doc = await firebase.db.collection("grades").doc(id).get();

  const newGrade = {
    ...doc.data(),
    name,
    curator_id,
    study_lang,
  };

  await firebase.db.collection("grades").doc(id).set(newGrade);

  res.status(200).send({ msg: "Класс обновлён" });
};
