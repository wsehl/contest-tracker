const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});

const middleware = require("../middleware");
const route = require("./index.js");

router.post("/login", middleware.auth.validateLogin, route.auth.login);
router.post("/signup", middleware.auth.validateRegister, route.auth.register);

router.get("/dashboard/users", middleware.auth.isAdmin, route.users.getAll);
router.post(
  "/dashboard/users",
  middleware.auth.isAdmin,
  middleware.dashboard.validateUsers,
  route.users.addNew
);
router.delete("/dashboard/user/:id", route.users.removeOne);
router.put("/dashboard/user/:id", route.users.updateOne);
router.post("/dashboard/delete/users", route.users.removeSeveralRows);

// router.get("/dashboard/user/:id", route.users.getOne);

router.get("/dashboard/events", route.events.getAll);
router.post(
  "/dashboard/events",
  middleware.auth.isAdmin,
  middleware.dashboard.validateEvents,
  route.events.addNew
);
router.get("/dashboard/event/:id", route.events.getOne);

router.get("/dashboard/organizations", route.organizations.getAll);
router.post(
  "/dashboard/organizations",
  middleware.auth.isAdmin,
  upload.single("file"),
  middleware.dashboard.validateOrganizations,
  route.organizations.addNew
);

// DATABASE
router.post("/migrate/users", route.sql.migrateUsers);
router.post("/migrate/events", route.sql.migrateEvents);
router.post("/migrate/organizations", route.sql.migrateOrganizations);

router.post("/seed/users", route.sql.seedUsers);
router.post("/seed/events", route.sql.seedEvents);
router.post("/seed/organizations", route.sql.seedOrganizations);

module.exports = router;
