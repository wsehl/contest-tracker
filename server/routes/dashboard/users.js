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
            const reg_date = new Date()
              .toISOString()
              .slice(0, 19)
              .replace("T", " ");

            const newUser = {
              username: req.body.username,
              password: hash,
              registered: reg_date,
              role: req.body.role,
              email: req.body.email
            };

            db.query("INSERT INTO users SET ?", newUser, (err) => {
              if (err) {
                console.error(err);
                return res.status(400).send({
                  msg: "An error occured"
                });
              }
              console.info(
                `Added user: [${newUser.username}] with role: [${newUser.role}] at [${new Date().toLocaleString(
                  "ru-RU",
                  {
                    timeZone: "Asia/Almaty"
                  }
                )}]`
              );
              return res.status(201).send({
                msg: "Successfully added user",
                status: 201
              });
            });
          }
        });
      }
    });
  }
};
module.exports = users;
