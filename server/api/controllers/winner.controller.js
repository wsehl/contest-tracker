const logger = require("~services/logger");
const firebase = require("~config/firebase.js");

const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
}).array("files");

exports.addNew = async (req, res) => {
  const newWinner = {
    project_id: req.body.project_id,
    event_id: req.body.event_id,
    place: req.body.place,
    description: req.body.description,
    // file_ids: files,
  };

  await firebase.db.collection("winners").add(newWinner);

  logger.info(`Added winner: [${newWinner.project_id}]`);

  res.status(201).send({
    msg: "Successfully added winner",
    status: 201,
  });
  // upload(req, res, async function (err) {
  //   if (err instanceof multer.MulterError) {
  //     return res.status(400).send({ msg: err.message });
  //   } else if (err) {
  //     return res.status(400).send({ msg: "Something went wrong" });
  //   } else {
  //     if (!req.files) {
  //       return res.status(400).send({ msg: "Error: No files found" });
  //     }

  //     const files = [];

  //     req.files.forEach((file) => {
  //       const newFileName = `${file.fieldname}_${Date.now()}`;

  //       const blob = firebase.bucket.file(newFileName);
  //       const blobWriter = blob.createWriteStream({
  //         metadata: {
  //           contentType: file.mimetype,
  //         },
  //       });

  //       blobWriter.on("error", () => {
  //         return res.status(400).send({
  //           msg: "Something is wrong! Unable to upload at the moment.",
  //         });
  //       });

  //       blobWriter.on("finish", async () => {
  //         const newFile = {
  //           url: `https://firebasestorage.googleapis.com/v0/b/contest-tracker-87dc8.appspot.com/o/${newFileName}`,
  //           name: newFileName,
  //         };

  //         const file = await firebase.db.collection("files").add(newFile);

  //         files.push(file._path.segments[1]);

  //         blobWriter.end(file.buffer);
  //       });
  //     });

  //     const newWinner = {
  //       project_id: req.body.project_id,
  //       event_id: req.body.event_id,
  //       place: req.body.place,
  //       description: req.body.description,
  //       // file_ids: files,
  //     };

  //     await firebase.db.collection("winners").set(newWinner);

  //     logger.info(`Added winner: [${newWinner.project_id}]`);

  //     res.status(201).send({
  //       msg: "Successfully added winner",
  //       status: 201,
  //     });
  //   }
  // });
};

exports.getAll = async (req, res) => {
  const winners = [];
  const snapshot = await firebase.db.collection("winners").get();

  snapshot.forEach(async (doc) => {
    const winner = doc.data();
    winner.id = doc.id;

    winners.push(winner);
  });

  await Promise.all(
    winners.map((item) =>
      firebase.db
        .collection("events")
        .doc(item.event_id)
        .get()
        .then((event) => {
          item.event = event.data();
        })
    )
  );

  await Promise.all(
    winners.map((item) =>
      firebase.db
        .collection("projects")
        .doc(item.project_id)
        .get()
        .then((project) => {
          item.project = project.data();
        })
    )
  );

  return res.status(200).send({ data: winners });
};

exports.getOne = async (req, res) => {
  const winner_id = req.params.id;
  const doc = await firebase.db.collection("winners").doc(winner_id).get();

  if (!doc.exists) {
    return res.status(404).send({
      msg: "Not Found",
      status: 404,
    });
  }
  const winner = doc.data();

  const project = await firebase.db
    .collection("projects")
    .doc(winner.project_id)
    .get();
  winner.project = project.data();

  const files = [];
  await Promise.all(
    winner.file_ids.map((file_id) =>
      firebase.db
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

exports.removeOne = async (req, res) => {
  const id = req.params.id;
  await firebase.db.collection("winners").doc(id).delete();
  res.status(200).send({ msg: "Результат удалён" });
};

exports.updateOne = async (req, res) => {
  const id = req.params.id;

  const { place, description, event_id, project_id } = req.body;

  const doc = await firebase.db.collection("winners").doc(id).get();

  const newData = {
    ...doc.data(),
    place,
    description,
    event_id,
    project_id,
  };

  await firebase.db.collection("winners").doc(id).set(newData);

  res.status(200).send({ msg: "Результат обновлён" });
};
