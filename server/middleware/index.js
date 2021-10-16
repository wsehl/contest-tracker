const authMiddleware = require("./validation/auth");
const dashboardMiddleware = require("./validation/dashboard");

module.exports = {
  auth: authMiddleware,
  dashboard: dashboardMiddleware,
};
