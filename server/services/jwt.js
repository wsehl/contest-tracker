const jwt = require("jsonwebtoken");
const { REFRESH_TOKEN_KEY } = require("~config/tokens.js");
const logger = require("~services/logger");

exports.verifyRefresh = (user, token) => {
  try {
    if (!token) return logger.error("No token provided");
    const { username, userId, role } = jwt.verify(token, REFRESH_TOKEN_KEY);
    return (
      username === user.username && userId === user.userId && role === user.role
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};
