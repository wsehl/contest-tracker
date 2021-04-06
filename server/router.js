/* eslint-disable no-unreachable */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const userMiddleware = require("./middleware/users.js");
require("dotenv").config();
const db = require("./lib/db.js");

// const mysql = require("mysql");

// function handleDisconnect() {
//   db = mysql.createConnection(process.env.DATABASE_URL);
//   db.connect(function(err) {
//     if (err) {
//       console.log("error when connecting to db:", err);
//       setTimeout(handleDisconnect, 2000);
//     }
//   });
//   db.on("error", function(err) {
//     console.log("db error", err);
//     if (err.code === "PROTOCOL_CONNECTION_LOST") {
//       handleDisconnect();
//     } else {
//       throw err;
//     }
//   });
// }

// db.on("error", (err) => {
//   if (err.code === "PROTOCOL_CONNECTION_LOST") {
//     handleDisconnect();
//   } else {
//     throw err;
//   }
// });

router.post("/signup", userMiddleware.validateRegister, (req, res, next) => {
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
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO users (username, password, registered, role, email) VALUES (${db.escape(
                req.body.username
              )}, ${db.escape(hash)}, now(), 'User', ${db.escape(
                req.body.email
              )})`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err,
                  });
                }
                return res.status(201).send({
                  msg: "Registered!",
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post("/login", (req, res, next) => {
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
              "SECRETKEY",
              {
                expiresIn: "7d",
              }
            );
            db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
              msg: "Logged in!",
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
});

router.get("/user", userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send("This is the secret content. Only logged in users can see that!");
});

router.get("/admin", userMiddleware.isAdmin, (req, res, next) => {
  res.send("This is the admin content. Only admin in users can see that!");
});

router.get("/dashboard/users", userMiddleware.isAdmin, (req, res, next) => {
  db.query(`SELECT * FROM users`, (err, result) => {
    return res.status(200).send({
      data: result,
    });
  });
});

module.exports = router;
