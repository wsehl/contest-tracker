const { db } = require("~libs/firebase.js");

const addNew = async (req, res) => {
  const { name } = req.body;

  const newSubject = { name };

  await db.collection("subjects").add(newSubject);

  console.info(
    `Added subject: [${newSubject.name}] at [${new Date().toLocaleString(
      "ru-RU",
      {
        timeZone: "Asia/Almaty",
      }
    )}]`
  );

  res.status(201).send({
    msg: "Successfully added subject",
    status: 201,
  });
};

module.exports = addNew;
