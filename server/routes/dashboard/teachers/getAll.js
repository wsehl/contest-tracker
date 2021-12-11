const { db } = require("~libs/firebase.js");

const getAll = async (req, res) => {
  const teachers = [];
  const snapshot = await db.collection("teachers").get();

  snapshot.forEach(async (doc) => {
    const teacher = doc.data();
    teacher.id = doc.id;

    teachers.push(teacher);
  });

  res.status(200).send({ data: teachers });
};

module.exports = getAll;
