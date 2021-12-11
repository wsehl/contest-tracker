const { db } = require("~libs/firebase.js");

const updateOne = async (req, res) => {
  const userId = req.params.id;

  const { username, email, role } = req.body;
  const newUser = { username, role, email };

  await db.collection("users").doc(userId).set(newUser);

  res.status(200).send({ msg: "Succesfully updated" });
};

module.exports = updateOne;
