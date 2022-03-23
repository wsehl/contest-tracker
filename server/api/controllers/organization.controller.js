const multer = require("multer");
const logger = require("~services/logger");
const firebase = require("~config/firebase.js");

const upload = multer({
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
}).single("file");

exports.addNew = async (req, res) => {
  upload(req, res, function (err) {
    if (!req.body.name) {
      return res.status(400).send({
        msg: "Please enter a valid organization name",
      });
    }
    if (err instanceof multer.MulterError) {
      return res.status(400).send({ msg: err.message });
    } else if (err) {
      return res.status(400).send({ msg: "Something went wrong" });
    } else {
      if (!req.file) {
        return res.status(400).send({ msg: "Error: No files found" });
      }

      const newFileName = `${req.file.fieldname}_${Date.now()}`;

      const blob = firebase.bucket.file(newFileName);
      const blobWriter = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      blobWriter.on("error", () => {
        return res.status(400).send({
          msg: "Something is wrong! Unable to upload at the moment.",
        });
      });

      blobWriter.on("finish", async () => {
        const newFile = {
          url: `https://firebasestorage.googleapis.com/v0/b/contest-tracker-87dc8.appspot.com/o/${newFileName}`,
          name: newFileName,
        };

        const file = await firebase.db.collection("files").add(newFile);

        const newOrganization = {
          organization_name: req.body.name,
          file_id: file._path.segments[1],
        };

        await firebase.db
          .collection("organizations")
          .doc(req.body.name)
          .set(newOrganization);

        logger.info(
          `Added organization: [${newOrganization.organization_name}]`
        );

        res.status(201).send({
          msg: "Successfully added organization",
          status: 201,
        });
      });

      blobWriter.end(req.file.buffer);
    }
  });
};

exports.getAll = async (req, res) => {
  const orgs = [];
  const snapshot = await firebase.db.collection("organizations").get();

  snapshot.forEach(async (doc) => {
    const org = doc.data();
    org.id = doc.id;

    orgs.push(org);
  });

  await Promise.all(
    orgs.map((org) =>
      firebase.db
        .collection("files")
        .doc(org.file_id)
        .get()
        .then((file_doc) => {
          const file = file_doc.data();
          org.organization_image = file.name;
        })
    )
  );

  return res.status(200).send({ data: orgs });
};

exports.removeOne = async (req, res) => {
  const id = req.params.id;
  await firebase.db.collection("organizations").doc(id).delete();
  res.status(200).send({ msg: "Организация удалена" });
};

exports.updateOne = async (req, res) => {
  const id = req.params.id;

  const { organization_name } = req.body;

  const doc = await firebase.db.collection("organizations").doc(id).get();

  const newData = {
    ...doc.data(),
    organization_name,
  };

  await firebase.db.collection("organizations").doc(id).set(newData);

  res.status(200).send({ msg: "Организация обновлена" });
};
