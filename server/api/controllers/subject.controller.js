const logger = require("~services/logger");
const firebase = require("~config/firebase.js");

exports.addNew = async (req, res) => {
  const { name } = req.body;

  const newSubject = { name };

  await firebase.db.collection("subjects").add(newSubject);

  logger.info(`Added subject: [${newSubject.name}]`);

  res.status(201).send({
    msg: "Successfully added subject",
    status: 201,
  });
};

exports.getAll = async (req, res) => {
  const subjects = [];
  const snapshot = await firebase.db.collection("subjects").get();

  snapshot.forEach(async (doc) => {
    const subject = doc.data();
    subject.id = doc.id;

    subjects.push(subject);
  });

  res.status(200).send({ data: subjects });
};

exports.removeOne = async (req, res) => {
  const id = req.params.id;
  await firebase.db.collection("subjects").doc(id).delete();
  res.status(200).send({ msg: "Предмет удалён" });
};

exports.updateOne = async (req, res) => {
  const id = req.params.id;

  const { name } = req.body;

  const doc = await firebase.db.collection("subjects").doc(id).get();

  const newSubject = {
    ...doc.data(),
    name,
  };

  await firebase.db.collection("subjects").doc(id).set(newSubject);

  res.status(200).send({ msg: "Предмет обновлён" });
};
