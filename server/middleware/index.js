const authMiddleware = require("./authMiddleware.js");
const dashboardMiddleware = require("./dashboardMiddleware.js");

module.exports = {
  auth: authMiddleware,
  dashboard: dashboardMiddleware,
};
