const { db } = require("../../../lib/firebase.js");

const addNew = async (req, res) => {
  const { first_name, middle_name, last_name } = req.body;

  const newCurator = {
    first_name,
    middle_name,
    last_name,
  };

  await db.collection("curators").add(newCurator);

  console.info(
    `Added curator: [${newCurator.name}] at [${new Date().toLocaleString(
      "ru-RU",
      { timeZone: "Asia/Almaty" }
    )}]`
  );

  res.status(201).send({
    msg: "Successfully added curator",
    status: 201,
  });
};

module.exports = addNew;
