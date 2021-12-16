const { db } = require("~libs/firebase.js");

const getAll = async (req, res) => {
  const winners = [];
  const snapshot = await db.collection("winners").get();

  snapshot.forEach(async (doc) => {
    const winner = doc.data();
    winner.id = doc.id;

    winners.push(winner);
  });

  return res.status(200).send({ data: winners });
};

module.exports = getAll;
