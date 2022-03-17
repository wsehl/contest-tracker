const logger = require("~services/logger");
const { db } = require("~config/firebase.js");

exports.addNew = async (req, res) => {
  const { name, curator_id } = req.body;

  const newGrade = { name, curator_id };

  await db.collection("grades").add(newGrade);

  logger.info(`Added grade: [${newGrade.name}]`);

  res.status(201).send({
    msg: "Successfully added grade",
    status: 201,
  });
};

exports.getAll = async (req, res) => {
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

exports.getOne = async (req, res) => {
  const gradeId = req.params.id;
  const doc = await db.collection("grades").doc(gradeId).get();

  if (!doc.exists) {
    return res.status(404).send({
      msg: "Not Found",
      status: 404,
    });
  }
  const grade = doc.data();
  const curator = await db.collection("curators").doc(grade.curator_id).get();
  grade.curator = curator.data();

  return res.status(200).send({ data: grade });
};
