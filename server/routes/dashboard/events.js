const db = require("../../lib/database.js");

const users = {
  getAll: (req, res) => {
    db.query(
      `SELECT * FROM organizations INNER JOIN events  
      ON events.organization_id = organizations.id`,
      (err, result) => {
        return res.status(200).send({
          data: result
        });
      }
    );
  },
  addNew: (req, res) => {
    db.query(
      `INSERT INTO events (organization_id, event_title, event_description, start_date, end_date) VALUES (${db.escape(
        req.body.event_organization
      )},${db.escape(req.body.event_title)},${db.escape(req.body.event_description)},${db.escape(req.body.event_start_date)},${db.escape(
        req.body.event_end_date
      )})`,
      (err) => {
        if (err) {
          return res.status(400).send({
            msg: err
          });
        }
        return res.status(201).send({
          msg: "Successfully added event",
          status: 201
        });
      }
    );
  }
};
module.exports = users;
