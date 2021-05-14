const db = require("../../lib/database.js");
const { mailer, mail_user } = require("../../lib/mailer.js");
const bcrypt = require("bcryptjs");

const users = {
  getAll: (req, res) => {
    db.query(`SELECT * FROM users`, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(400).send({
          msg: "An error occured"
        });
      }
      return res.status(200).send({
        data: result
      });
    });
  },
  removeOne: (req, res) => {
    const userId = req.params.id;
    db.query(`DELETE FROM users WHERE id = ${db.escape(userId)}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(400).send({
          msg: "An error occured"
        });
      }
      db.query(`ALTER TABLE users AUTO_INCREMENT = 1`, (err) => {
        if (err) {
          console.error(err);
          return res.status(400).send({
            msg: "An error occured"
          });
        }
      });
      return res.status(200).send({
        msg: "Succesfully removed"
      });
    });
  },
  updateOne: (req, res) => {
    const userId = req.params.id;
    db.query(
      `UPDATE users SET username = ${db.escape(req.body.username)}, role = ${db.escape(
        req.body.role
      )}, email = ${db.escape(req.body.email)} WHERE id = ${db.escape(userId)}`,
      (err) => {
        if (err) {
          console.error(err);
          return res.status(400).send({
            msg: "An error occured"
          });
        }
        return res.status(200).send({
          msg: "Succesfully updated"
        });
      }
    );
  },
  addNew: (req, res) => {
    db.query(
      `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
        req.body.username
      )}) OR LOWER(email) = LOWER(${db.escape(req.body.email)});`,
      (err, result) => {
        if (result.length) {
          if (req.body.username == result[0].username) {
            return res.status(409).send({
              msg: "This username is already in use!"
            });
          } else if (req.body.email == result[0].email) {
            return res.status(409).send({
              msg: "This email is already in use!"
            });
          } else {
            return res.status(409).send({
              msg: "This username or email is already in use!"
            });
          }
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                msg: err
              });
            }
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

            const mailOptions = {
              from: mail_user,
              to: req.body.email,
              subject: "Your new account on Contest Tracker",
              html: `Username: ${req.body.username} <br />Password: ${req.body.password}<br />Role: ${req.body.role}`
            };

            mailer.sendMail(mailOptions, function(error) {
              if (error) {
                return res.status(403).send({
                  msg: "Email not valid!"
                });
              }
              db.query("INSERT INTO users SET ?", newUser, (err) => {
                if (err) {
                  console.error(err);
                  return res.status(400).send({
                    msg: "An error occured!"
                  });
                }
                console.log(req.body.password, req.body.username, newUser);
                console.info(
                  `Added user: [${newUser.username}] with role: [${newUser.role}] at [${new Date().toLocaleString(
                    "ru-RU",
                    {
                      timeZone: "Asia/Almaty"
                    }
                  )}]`
                );
              });
              return res.status(201).send({
                msg: "Successfully added user",
                status: 201
              });
            });
          });
        }
      }
    );
  }
};
module.exports = users;
