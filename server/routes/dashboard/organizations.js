const db = require("../../lib/database.js");

const organizations = {
  getAll: (req, res) => {
    db.query(`SELECT * FROM organizations`, (err, result) => {
      return res.status(200).send({
        data: result
      });
    });
  },
  addNew: (req, res) => {
    db.query(
      `INSERT INTO organizations (organization_name, organization_image) VALUES (${db.escape(req.body.name)}, ${db.escape(
        req.file.filename
      )})`,
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
  }
};
module.exports = organizations;
