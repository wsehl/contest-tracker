const { db } = require("../../../lib/firebase.js");

const removeSeveralRows = async (req, res) => {
  await Promise.all(
    req.body.map((id) => db.collection("users").doc(id).delete())
  );
  res.status(200).send({ msg: "Succefully Removed" });
};

module.exports = removeSeveralRows;
