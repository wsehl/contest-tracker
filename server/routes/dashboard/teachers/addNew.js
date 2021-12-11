const { db } = require("~libs/firebase.js");

const addNew = async (req, res) => {
  const { first_name, middle_name, last_name } = req.body;

  const newTeacher = {
    first_name,
    middle_name,
    last_name,
  };

  await db.collection("teachers").add(newTeacher);

  console.info(
    `Added teacher: [${newTeacher.name}] at [${new Date().toLocaleString(
      "ru-RU",
      { timeZone: "Asia/Almaty" }
    )}]`
  );

  res.status(201).send({
    msg: "Successfully added teacher",
    status: 201,
  });
};

module.exports = addNew;
