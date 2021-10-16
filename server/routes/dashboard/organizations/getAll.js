const { db } = require("../../../lib/firebase.js");

const getAll = async (req, res) => {
  const orgs = [];
  const snapshot = await db.collection("organizations").get();

  snapshot.forEach((doc) => {
    const org = doc.data();
    org.id = doc.id;

    orgs.push(org);
  });

  return res.status(200).send({ data: orgs });
};

module.exports = getAll;
