const { db } = require("~libs/firebase.js");

const getOne = async (req, res) => {
  const winner_id = req.params.id;
  const doc = await db.collection("winners").doc(winner_id).get();

  if (!doc.exists) {
    return res.status(404).send({
      msg: "Not Found",
      status: 404,
    });
  }
  const winner = doc.data();

  const project = await db.collection("projects").doc(winner.project_id).get();
  winner.project = project.data();

  const files = [];
  await Promise.all(
    winner.file_ids.map((file_id) =>
      db
        .collection("files")
        .doc(file_id)
        .get()
        .then((doc) => {
          const file = doc.data();
          files.push(file);
        })
    )
  );
  winner.files = files;

  return res.status(200).send({ data: winner });
};

module.exports = getOne;
