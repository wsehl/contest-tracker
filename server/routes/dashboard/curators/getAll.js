const { db } = require("../../../lib/firebase.js");

const getAll = async (req, res) => {
  const curators = [];
  const snapshot = await db.collection("curators").get();

  snapshot.forEach(async (doc) => {
    const curator = doc.data();
    curator.id = doc.id;

    curators.push(curator);
  });

  res.status(200).send({ data: curators });
};

module.exports = getAll;
