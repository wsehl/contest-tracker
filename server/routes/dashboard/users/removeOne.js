const { db } = require("~libs/firebase.js");

const removeOne = async (req, res) => {
  const userId = req.params.id;
  await db.collection("users").doc(userId).delete();
  res.status(200).send({ msg: "Succefully Removed" });
};

module.exports = removeOne;
