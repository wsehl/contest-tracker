const auth = require("./auth/index.js");
const users = require("./dashboard/users/index.js");
const events = require("./dashboard/events/index.js");
const organizations = require("./dashboard/organizations/index.js");
const grades = require("./dashboard/grades/index.js");
const students = require("./dashboard/students/index.js");
const teachers = require("./dashboard/teachers/index.js");
const projects = require("./dashboard/projects/index.js");
const curators = require("./dashboard/curators/index.js");
const subjects = require("./dashboard/subjects/index.js");
const winners = require("./dashboard/winners/index.js");

module.exports = {
  auth,
  users,
  events,
  organizations,
  grades,
  students,
  teachers,
  projects,
  curators,
  subjects,
  winners,
};
