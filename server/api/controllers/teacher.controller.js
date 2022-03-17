const logger = require("~services/logger");
const { db } = require("~config/firebase.js");

exports.addNew = async (req, res) => {
  const { first_name, middle_name, last_name, phone, subject_id } = req.body;

  const newTeacher = {
    first_name,
    middle_name,
    last_name,
    phone,
    subject_id,
  };

  await db.collection("teachers").add(newTeacher);

  logger.info(`Added teacher: [${newTeacher.name}]`);

  res.status(201).send({
    msg: "Successfully added teacher",
    status: 201,
  });
};

exports.getAll = async (req, res) => {
  const teachers = [];
  const snapshot = await db.collection("teachers").get();

  snapshot.forEach(async (doc) => {
    const teacher = doc.data();
    teacher.id = doc.id;

    teachers.push(teacher);
  });

  res.status(200).send({ data: teachers });
};

exports.getOne = async (req, res) => {
  const teacherId = req.params.id;
  const doc = await db.collection("teachers").doc(teacherId).get();

  if (!doc.exists) {
    return res.status(404).send({
      msg: "Not Found",
      status: 404,
    });
  }

  const teacher = doc.data();

  const subject = db.collection("subjects").doc(teacher.subject_id).get();
  teacher.subject = subject.data();

  return res.status(200).send({ data: teacher });
};
