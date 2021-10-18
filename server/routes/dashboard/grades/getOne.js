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
  const curator = await db.collection("curators").doc(grade.curator_id).get();
  grade.curator = curator.data();

  return res.status(200).send({ data: grade });
};

module.exports = getOne;
