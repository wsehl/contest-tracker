const { db } = require("../../../lib/firebase.js");

const getOne = async (req, res) => {
  const gradeId = req.params.id;
  const doc = await db.collection("grades").doc(gradeId).get();

  if (!doc.exists) {
    return res.status(404).send({
      msg: "Not Found",
      status: 404,
    });
  }
  const grade = doc.data();

  return res.status(200).send({ data: grade });
};

module.exports = getOne;
