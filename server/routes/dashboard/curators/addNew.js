const { db } = require("~libs/firebase.js");
const logger = require("~utils/logger");

const addNew = async (req, res) => {
  const { first_name, middle_name, last_name, phone } = req.body;

  const newCurator = {
    first_name,
    middle_name,
    last_name,
    phone,
  };

  await db.collection("curators").add(newCurator);

  logger.info(`Added curator: [${newCurator.name}]`);

  res.status(201).send({
    msg: "Successfully added curator",
    status: 201,
  });
};

module.exports = addNew;
