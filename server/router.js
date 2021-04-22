/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
// const uuid = require("uuid");
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const router = express.Router();
const bcrypt = require("bcryptjs");
const path = require("path");
const jwt = require("jsonwebtoken");
const db = require("./lib/db.js");
const authMiddleware = require("./middleware/users.js");
const dashboardMiddleware = require("./middleware/dashboard.js");

const auth = require("./routes/auth.js");

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

router.post("/login", auth.login);
router.post("/signup", auth.register, authMiddleware.validateRegister);


router.get("/dashboard/users", authMiddleware.isAdmin, (req, res, next) => {
  db.query(`SELECT * FROM users`, (err, result) => {
    return res.status(200).send({
      data: result,
    });
  });
});

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
  dashboardMiddleware.validateEvents,
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
