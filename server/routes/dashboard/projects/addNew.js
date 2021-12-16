const { db } = require("~libs/firebase.js");
const logger = require("~utils/logger");

const addNew = async (req, res) => {
  const {
    name,
    description,
    start_date,
    end_date,
    teacher_id,
    students_ids,
    subject_id,
  } = req.body;

  const newProject = {
    name,
    description,
    start_date,
    end_date,
    teacher_id,
    students_ids,
    subject_id,
  };

  await db.collection("projects").add(newProject);

  logger.info(`Added project: [${newProject.name}]`);

  res.status(201).send({
    msg: "Successfully added project",
    status: 201,
  });
};

module.exports = addNew;
