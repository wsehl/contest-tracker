const db = require("../../lib/database.js");

const events = {
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
  getOne: (req, res) => {
    const eventId = req.params.id;
    db.query(
      `SELECT * FROM organizations INNER JOIN events ON events.organization_id = organizations.id WHERE events.id = ${db.escape(
        eventId
      )}`,
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(400).send({
            msg: "An error occured"
          });
        }
        return res.status(200).send({
          data: result
        });
      }
    );
  },
  addNew: (req, res) => {
    const newEvent = {
      organization_id: req.body.event_organization,
      event_title: req.body.event_title,
      event_description: req.body.event_description,
      start_date: req.body.event_start_date,
      end_date: req.body.event_end_date
    };
    db.query("INSERT INTO events SET ?", newEvent, (err) => {
      if (err) {
        console.error(err);
        return res.status(400).send({
          msg: "An error occured"
        });
      }
      console.info(
        `Added event: [${newEvent.event_title}] at [${new Date().toLocaleString("ru-RU", {
          timeZone: "Asia/Almaty"
        })}]`
      );
      return res.status(201).send({
        msg: "Successfully added event",
        status: 201
      });
    });
  }
};
module.exports = events;
