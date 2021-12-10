const { db } = require("../../../lib/firebase.js");

const addNew = async (req, res) => {
  const { name, curator_id } = req.body;

  const newGrade = { name, curator_id };

  await db.collection("grades").add(newGrade);

  console.info(
    `Added grade: [${newGrade.name}] at [${new Date().toLocaleString("ru-RU", {
      timeZone: "Asia/Almaty",
    })}]`
  );

  res.status(201).send({
    msg: "Successfully added grade",
    status: 201,
  });
};

module.exports = addNew;