const { db } = require("~libs/firebase.js");

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

  console.info(
    `Added student: [${newStudent.name}] at [${new Date().toLocaleString(
      "ru-RU",
      { timeZone: "Asia/Almaty" }
    )}]`
  );

  res.status(201).send({
    msg: "Successfully added student",
    status: 201,
  });
};

module.exports = addNew;
