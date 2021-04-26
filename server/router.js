/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
// const uuid = require("uuid");
require("dotenv").config();
const express = require("express");
const router = express.Router();
const middleware = require("./middleware");
const route = require("./routes");

const db = require("./lib/db.js");
db.connect();

const upload = require("./filestorage");
const bcrypt = require("bcryptjs");

router.post("/login", middleware.auth.validateLogin, route.auth.login);
router.post("/signup", middleware.auth.validateRegister, route.auth.register);

router.get("/dashboard/users", middleware.auth.isAdmin, route.users.getUsers);

router.get("/dashboard/events", (req, res, next) => {
  db.query(
    `SELECT * FROM organizations INNER JOIN events  
  ON events.organization_id = organizations.id`,
    (err, result) => {
      return res.status(200).send({
        data: result,
      });
    }
  );
});

router.get("/dashboard/organizations", (req, res, next) => {
  db.query(`SELECT * FROM organizations`, (err, result) => {
    return res.status(200).send({
      data: result,
    });
  });
});

router.post(
  "/dashboard/post/users",
  middleware.dashboard.validateUsers,
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
  middleware.dashboard.validateOrganizations,
  (req, res) => {
    db.query(
      `INSERT INTO organizations (organization_name, organization_image) VALUES (${db.escape(
        req.body.name
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
  middleware.dashboard.validateEvents,
  (req, res, next) => {
    db.query(
      `INSERT INTO events (organization_id, event_title, event_description, start_date, end_date) VALUES (${db.escape(
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
