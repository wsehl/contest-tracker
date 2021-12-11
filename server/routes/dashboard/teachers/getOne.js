const { db } = require("~libs/firebase.js");

const getOne = async (req, res) => {
  const teacherId = req.params.id;
  const doc = await db.collection("teachers").doc(teacherId).get();

  if (!doc.exists) {
    return res.status(404).send({
      msg: "Not Found",
      status: 404,
    });
  }

  const teacher = doc.data();

  return res.status(200).send({ data: teacher });
};

module.exports = getOne;
