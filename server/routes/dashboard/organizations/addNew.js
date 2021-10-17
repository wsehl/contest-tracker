const firebase = require("../../../lib/firebase.js");
const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single("file");

const addNew = async (req, res) => {
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
        const newOrganization = {
          organization_name: req.body.name,
          organization_image: newFileName,
        };

        await firebase.db
          .collection("organizations")
          .doc(req.body.name)
          .set(newOrganization);

        console.info(
          `Added organization: [${
            newOrganization.organization_name
          }] at [${new Date().toLocaleString("ru-RU", {
            timeZone: "Asia/Almaty",
          })}]`
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

module.exports = addNew;
