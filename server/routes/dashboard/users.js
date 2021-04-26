const db = require("../../lib/database.js");
const bcrypt = require("bcryptjs");

const users = {
  getAll: (req, res) => {
    db.query(`SELECT * FROM users`, (err, result) => {
      return res.status(200).send({
        data: result
      });
    });
  },
  addNew: (req, res) => {
    db.query(`SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(req.body.username)});`, (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: "This username is already in use!"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            db.query(
              `INSERT INTO users (username, password, registered, role, email) VALUES (${db.escape(req.body.username)}, ${db.escape(
                hash
              )}, now(), ${db.escape(req.body.role)}, ${db.escape(req.body.email)})`,
              (err) => {
                if (err) {
                  return res.status(400).send({
                    msg: err
                  });
                }
                return res.status(201).send({
                  msg: "Successfully registered",
                  status: 201
                });
              }
            );
          }
        });
      }
    });
  }
};
module.exports = users;
