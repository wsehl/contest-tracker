const logger = require("~services/logger");
const { db } = require("~config/firebase.js");

exports.addNew = async (req, res) => {
  const { first_name, middle_name, last_name, phone } = req.body;

  const newCurator = {
    first_name,
    middle_name,
    last_name,
    phone,
  };

  await db.collection("curators").add(newCurator);

  logger.info(`Added curator: [${newCurator.name}]`);

  res.status(201).send({
    msg: "Successfully added curator",
    status: 201,
  });
};

exports.getAll = async (req, res) => {
  const curators = [];
  const snapshot = await db.collection("curators").get();

  snapshot.forEach(async (doc) => {
    const curator = doc.data();
    curator.id = doc.id;

    curators.push(curator);
  });

  res.status(200).send({ data: curators });
};

exports.getOne = async (req, res) => {
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
