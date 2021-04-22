/* eslint-disable no-unreachable */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../lib/db.js");

const auth = {
  login: (req, res) => {
    db.query(
      `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
      (err, result) => {
        // user does not exists
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err,
          });
        }
        if (!result.length) {
          return res.status(401).send({
            msg: "Username or password is incorrect!",
          });
        }
        // check password
        bcrypt.compare(
          req.body.password,
          result[0]["password"],
          (bErr, bResult) => {
            // wrong password
            if (bErr) {
              throw bErr;
              return res.status(401).send({
                msg: "Username or password is incorrect!",
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
                  expiresIn: "7d",
                }
              );
              db.query(
                `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
              );
              return res.status(200).send({
                msg: "Logged in successfully",
                token,
                user: result[0],
              });
            }
            return res.status(401).send({
              msg: "Username or password is incorrect!",
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
      )});`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({
            msg: "This username is already in use!",
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                msg: err,
              });
            } else {
              db.query(
                `INSERT INTO users (username, password, registered, role, email) VALUES (${db.escape(
                  req.body.username
                )}, ${db.escape(hash)}, now(), 'User', ${db.escape(
                  req.body.email
                )})`,
                (err) => {
                  if (err) {
                    throw err;
                    return res.status(400).send({
                      msg: err,
                    });
                  }
                  return res.status(201).send({
                    msg: "Successfully registered",
                  });
                }
              );
            }
          });
        }
      }
    );
  },
};
module.exports = auth;
