const logger = require("~services/logger");
const { db } = require("~config/firebase.js");

exports.addNew = async (req, res) => {
  const { name } = req.body;

  const newSubject = { name };

  await db.collection("subjects").add(newSubject);

  logger.info(`Added subject: [${newSubject.name}]`);

  res.status(201).send({
    msg: "Successfully added subject",
    status: 201,
  });
};

exports.getAll = async (req, res) => {
  const subjects = [];
  const snapshot = await db.collection("subjects").get();

  snapshot.forEach(async (doc) => {
    const subject = doc.data();
    subject.id = doc.id;

    subjects.push(subject);
  });

  res.status(200).send({ data: subjects });
};
