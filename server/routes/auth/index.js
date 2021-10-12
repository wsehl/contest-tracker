const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../lib/database.js");

const auth = {
  login: (req, res) => {
    db.query(
      `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(400);
        }
        if (!result.length) {
          return res.status(401).send({
            msg: "Username or password is incorrect!", // Account not found
          });
        }
        bcrypt.compare(
          req.body.password,
          result[0].password,
          (bErr, bResult) => {
            if (bErr) {
              console.error(bErr);
              return res.status(401).send({
                msg: "Username or password is incorrect!", // Bcrypt error
              });
            }
            if (bResult) {
              const token = jwt.sign(
                {
                  username: result[0].username,
                  userId: result[0].id,
                  role: result[0].role,
                },
                process.env.SECRET_KEY,
                {
                  expiresIn: "365d",
                }
              );
              db.query(
                `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
              );
              console.info(
                `Logged in user: [${result[0].username}] with role: [${
                  result[0].role
                }] at [${new Date().toLocaleString("ru-RU", {
                  timeZone: "Asia/Almaty",
                })}]`
              );
              return res.status(200).send({
                msg: "Logged in successfully",
                token,
                user: result[0],
              });
            }
            return res.status(401).send({
              msg: "Username or password is incorrect!", // Wrong password
            });
          }
        );
      }
    );
  },
  register: (req, res) => {
    db.query(
      `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
        req.body.username
      )}) OR LOWER(email) = LOWER(${db.escape(req.body.email)});`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({
            msg: "This username or email is already in use!",
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                msg: err,
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
                role: "User",
                email: req.body.email,
              };
              db.query("INSERT INTO users SET ?", newUser, (err) => {
                if (err) {
                  console.error(err);
                  return res.status(400).send({
                    msg: "An error occured",
                  });
                }
                console.info(
                  `Registered user: [${newUser.username}] with role: [${
                    newUser.role
                  }] at [${new Date().toLocaleString("ru-RU", {
                    timeZone: "Asia/Almaty",
                  })}]`
                );
                return res.status(201).send({
                  msg: "Successfully registered",
                  status: 201,
                });
              });
            }
          });
        }
      }
    );
  },
};
module.exports = auth;
