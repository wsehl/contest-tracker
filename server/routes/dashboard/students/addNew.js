const { db } = require("~libs/firebase.js");
const logger = require("~utils/logger");

const addNew = async (req, res) => {
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

module.exports = addNew;
