const auth = require("./auth.js");
const users = require("./dashboard/users.js");
const events = require("./dashboard/events.js");
const organizations = require("./dashboard/organizations.js");

module.exports = {
  auth: auth,
  users: users,
  events: events,
  organizations: organizations,
};
