const db = require("../../lib/database.js");
const firebase = require("../../lib/firebase.js");

const organizations = {
  getAll: (req, res) => {
    db.query(`SELECT * FROM organizations`, (err, result) => {
      return res.status(200).send({
        data: result
      });
    });
  },
  addNew: (req, res) => {
    if (!req.file) {
      res.status(400).send({ msg: "Error: No files found" });
    } else {
      let newFileName = `${req.file.fieldname}_${Date.now()}`;

      const blob = firebase.bucket.file(newFileName);
      const blobWriter = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype
        }
      });
      blobWriter.on("error", () => {
        return res.status(400).send({
          msg: "Something is wrong! Unable to upload at the moment."
        });
      });
      blobWriter.on("finish", () => {
        db.query(
          `INSERT INTO organizations (organization_name, organization_image) VALUES (${db.escape(
            req.body.name
          )}, ${db.escape(newFileName)})`,
          (err) => {
            if (err) {
              return res.status(400).send({
                msg: err
              });
            }
            return res.status(201).send({
              msg: "Successfully added organization",
              status: 201
            });
          }
        );
      });
      blobWriter.end(req.file.buffer);
    }
  }
};
module.exports = organizations;
