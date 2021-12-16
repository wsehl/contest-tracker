const { db } = require("~libs/firebase.js");
const logger = require("~utils/logger");

const addNew = async (req, res) => {
  const { name, curator_id } = req.body;

  const newGrade = { name, curator_id };

  await db.collection("grades").add(newGrade);

  logger.info(`Added grade: [${newGrade.name}]`);

  res.status(201).send({
    msg: "Successfully added grade",
    status: 201,
  });
};

module.exports = addNew;
