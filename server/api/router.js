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
router.use("/users", userRoutes);
router.use("/winners", winnerRoutes);
router.use("/teachers", teacherRoutes);
router.use("/subjects", subjectRoutes);
router.use("/students", studentRoutes);
router.use("/projects", projectRoutes);
router.use("/organizations", organizationRoutes);
router.use("/grades", gradeRoutes);
router.use("/events", eventRoutes);
router.use("/curators", curatorRoutes);

module.exports = router;
