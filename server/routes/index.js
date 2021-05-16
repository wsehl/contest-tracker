const auth = require("./auth.js");
const sql = require("./sql.js");
const users = require("./dashboard/users.js");
const events = require("./dashboard/events.js");
const organizations = require("./dashboard/organizations.js");

module.exports = {
  auth: auth,
  sql: sql,
  users: users,
  events: events,
  organizations: organizations
};
