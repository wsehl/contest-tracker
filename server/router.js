/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
// const uuid = require("uuid");
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const db = require("./lib/db.js");
const userMiddleware = require("./middleware/users.js");
const dashboardMiddleware = require("./middleware/dashboard.js");

db.connect();

const folder = path.join(__dirname, "files");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, folder);
  },
  filename: function(req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + Date.now() + "." + extension);
  },
});
const upload = multer({ storage: storage });

router.get("/dashboard/users", userMiddleware.isAdmin, (req, res, next) => {
  db.query(`SELECT * FROM users`, (err, result) => {
    return res.status(200).send({
      data: result,
    });
  });
});

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
              (err, result) => {
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
});

router.post(
  "/dashboard/post/users",
  dashboardMiddleware.validateUsers,
  (req, res, next) => {
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
                )}, ${db.escape(hash)}, now(), ${db.escape(
                  req.body.role
                )}, ${db.escape(req.body.email)})`,
                (err, result) => {
                  if (err) {
                    throw err;
                    return res.status(400).send({
                      msg: err,
                    });
                  }
                  return res.status(201).send({
                    msg: "Successfully registered",
                    status: 201,
                  });
                }
              );
            }
          });
        }
      }
    );
  }
);

router.post(
  "/dashboard/post/organizations",
  upload.single("file"),
  dashboardMiddleware.validateOrganizations,
  (req, res) => {
    db.query(
      `INSERT INTO organizations (organization_name, organization_image) VALUES (${db.escape(
        req.body.organization_name
      )}, ${db.escape(req.file.filename)})`,
      (err) => {
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err,
          });
        }
        return res.status(201).send({
          msg: "Successfully added organization",
          status: 201,
        });
      }
    );
  }
);

router.post(
  "/dashboard/post/events",
  dashboardMiddleware.validateEvents,
  (req, res, next) => {
    db.query(
      `INSERT INTO events (organization_name, event_title, event_description, start_date, end_date) VALUES (${db.escape(
        req.body.event_organization
      )},${db.escape(req.body.event_title)},${db.escape(
        req.body.event_description
      )},${db.escape(req.body.event_start_date)},${db.escape(
        req.body.event_end_date
      )})`,
      (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err,
          });
        }
        return res.status(201).send({
          msg: "Successfully added event",
          status: 201,
        });
      }
    );
  }
);

module.exports = router;
