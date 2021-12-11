const { db } = require("~libs/firebase.js");

const getOne = async (req, res) => {
  const curatorId = req.params.id;
  const doc = await db.collection("curators").doc(curatorId).get();

  if (!doc.exists) {
    return res.status(404).send({
      msg: "Not Found",
      status: 404,
    });
  }

  const curator = doc.data();

  return res.status(200).send({ data: curator });
};

module.exports = getOne;
