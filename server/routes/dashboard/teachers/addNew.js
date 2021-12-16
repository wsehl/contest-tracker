const { db } = require("~libs/firebase.js");
const logger = require("~utils/logger");

const addNew = async (req, res) => {
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

module.exports = addNew;
