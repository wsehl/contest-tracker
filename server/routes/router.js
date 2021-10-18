const express = require("express");
const router = express.Router();

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

// events
router.get("/dashboard/events", route.events.getAll);
router.post(
  "/dashboard/events",
  middleware.auth.isAdmin,
  middleware.dashboard.validateEvents,
  route.events.addNew
);
router.get("/dashboard/event/:id", route.events.getOne);

// grades
router.get("/dashboard/grades", route.grades.getAll);
router.post(
  "/dashboard/grades",
  middleware.auth.isAdmin,
  middleware.dashboard.validateGrades,
  route.grades.addNew
);
router.get("/dashboard/grades/:id", route.grades.getOne);

// students
router.get("/dashboard/students", route.students.getAll);
router.post(
  "/dashboard/students",
  middleware.auth.isAdmin,
  middleware.dashboard.validateStudents,
  route.students.addNew
);
router.get("/dashboard/students/:id", route.students.getOne);

// teachers
router.get("/dashboard/teachers", route.teachers.getAll);
router.post(
  "/dashboard/teachers",
  middleware.auth.isAdmin,
  middleware.dashboard.validateTeachers,
  route.teachers.addNew
);
router.get("/dashboard/teachers/:id", route.teachers.getOne);

// curators
router.get("/dashboard/curators", route.curators.getAll);
router.post(
  "/dashboard/curators",
  middleware.auth.isAdmin,
  middleware.dashboard.validateCurators,
  route.curators.addNew
);
router.get("/dashboard/curators/:id", route.curators.getOne);

// projects
router.get("/dashboard/projects", route.projects.getAll);
router.post(
  "/dashboard/projects",
  middleware.auth.isAdmin,
  middleware.dashboard.validateProjects,
  route.projects.addNew
);
router.get("/dashboard/projects/:id", route.projects.getOne);

// organisations
router.get("/dashboard/organizations", route.organizations.getAll);
router.post(
  "/dashboard/organizations",
  middleware.auth.isAdmin,
  route.organizations.addNew
);

module.exports = router;
