const express = require("express");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const winnerRoutes = require("./routes/winner.route");
const teacherRoutes = require("./routes/teacher.route");
const subjectRoutes = require("./routes/subject.route");
const studentRoutes = require("./routes/student.route");
const projectRoutes = require("./routes/project.route");
const organizationRoutes = require("./routes/organization.route");
const gradeRoutes = require("./routes/grade.route");
const eventRoutes = require("./routes/event.route");
const curatorRoutes = require("./routes/curator.route");

const router = express.Router();

router.get("/status", (req, res) => res.send("OK"));

router.use("/auth", authRoutes);
router.use("/dashboard/users", userRoutes);
router.use("/dashboard/winners", winnerRoutes);
router.use("/dashboard/teachers", teacherRoutes);
router.use("/dashboard/subjects", subjectRoutes);
router.use("/dashboard/students", studentRoutes);
router.use("/dashboard/projects", projectRoutes);
router.use("/dashboard/organizations", organizationRoutes);
router.use("/dashboard/grades", gradeRoutes);
router.use("/dashboard/events", eventRoutes);
router.use("/dashboard/curators", curatorRoutes);

module.exports = router;
