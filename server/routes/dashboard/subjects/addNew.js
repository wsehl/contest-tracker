const { db } = require("~libs/firebase.js");
const logger = require("~utils/logger");

const addNew = async (req, res) => {
  const { name } = req.body;

  const newSubject = { name };

  await db.collection("subjects").add(newSubject);

  logger.info(`Added subject: [${newSubject.name}]`);

  res.status(201).send({
    msg: "Successfully added subject",
    status: 201,
  });
};

module.exports = addNew;
