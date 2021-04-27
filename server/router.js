require("dotenv").config();
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const folder = path.join(__dirname, "files");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, folder);
  },
  filename: function(req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + Date.now() + "." + extension);
  }
});
const upload = multer({ storage: storage });

const db = require("./lib/database.js");
db.connect();

const middleware = require("./middleware");
const route = require("./routes");

router.post("/login", middleware.auth.validateLogin, route.auth.login);
router.post("/signup", middleware.auth.validateRegister, route.auth.register);

router.get("/dashboard/users", middleware.auth.isAdmin, route.users.getAll);
router.post("/dashboard/users", middleware.auth.isAdmin, middleware.dashboard.validateUsers, route.users.addNew);

router.get("/dashboard/events", route.events.getAll);
router.post("/dashboard/events", middleware.auth.isAdmin, middleware.dashboard.validateEvents, route.events.addNew);

router.get("/dashboard/organizations", route.organizations.getAll);
router.post(
  "/dashboard/organizations",
  middleware.auth.isAdmin,
  upload.single("file"),
  middleware.dashboard.validateOrganizations,
  route.organizations.addNew
);

module.exports = router;
