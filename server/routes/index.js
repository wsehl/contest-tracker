const auth = require("./auth/index.js");
const users = require("./dashboard/users/index.js");
const events = require("./dashboard/events/index.js");
const organizations = require("./dashboard/organizations/index.js");

module.exports = { auth, users, events, organizations };
