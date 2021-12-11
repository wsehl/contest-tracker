const { db } = require("~libs/firebase.js");

const getAll = async (req, res) => {
  const users = [];
  const snapshot = await db.collection("users").get();

  snapshot.forEach((doc) => {
    const user = doc.data();
    user.id = doc.id;

    users.push(user);
  });

  return res.status(200).send({ data: users });
};

module.exports = getAll;
