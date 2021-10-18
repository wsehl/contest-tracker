const { db } = require("../../../lib/firebase.js");

const addNew = async (req, res) => {
  const { name, description, start_date, end_date, teacher_id, students_ids } =
    req.body;

  const newProject = {
    name,
    description,
    start_date,
    end_date,
    teacher_id,
    students_ids,
  };

  await db.collection("projects").add(newProject);

  console.info(
    `Added project: [${newProject.name}] at [${new Date().toLocaleString(
      "ru-RU",
      { timeZone: "Asia/Almaty" }
    )}]`
  );

  res.status(201).send({
    msg: "Successfully added project",
    status: 201,
  });
};

module.exports = addNew;
