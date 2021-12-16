const firebase = require("~libs/firebase.js");
const logger = require("~utils/logger");
const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
}).array("files");

const addNew = async (req, res) => {
  upload(req, res, async function (err) {
    if (!req.body.project_id) {
      return res.status(400).send({
        msg: "Please enter a valid project",
      });
    }
    if (!req.body.place) {
      return res.status(400).send({
        msg: "Please enter a valid winning place",
      });
    }
    if (!req.body.description) {
      return res.status(400).send({
        msg: "Please enter a valid description",
      });
    }

    if (err instanceof multer.MulterError) {
      return res.status(400).send({ msg: err.message });
    } else if (err) {
      return res.status(400).send({ msg: "Something went wrong" });
    } else {
      if (!req.files) {
        return res.status(400).send({ msg: "Error: No files found" });
      }

      const files = [];

      req.files.forEach((file) => {
        const newFileName = `${file.fieldname}_${Date.now()}`;

        const blob = firebase.bucket.file(newFileName);
        const blobWriter = blob.createWriteStream({
          metadata: {
            contentType: file.mimetype,
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

          files.push(file._path.segments[1]);

          blobWriter.end(file.buffer);
        });
      });

      const newWinner = {
        project_id: req.body.project_id,
        place: req.body.place,
        description: req.body.description,
        file_ids: files,
      };

      await firebase.db.collection("winners").set(newWinner);

      logger.info(`Added winner: [${newWinner.project_id}]`);

      res.status(201).send({
        msg: "Successfully added winner",
        status: 201,
      });
    }
  });
};

module.exports = addNew;
