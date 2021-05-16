const express = require("express");
const db = express.Router();

const route = require("./routes");

db.post("/migrate/users", route.sql.migrateUsers);
db.post("/migrate/events", route.sql.migrateEvents);
db.post("/migrate/organizations", route.sql.migrateOrganizations);

db.post("/seed/users", route.sql.seedUsers);
db.post("/seed/events", route.sql.seedEvents);
db.post("/seed/organizations", route.sql.seedOrganizations);

module.exports = db;
