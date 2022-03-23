const jwt = require("jsonwebtoken");
const { REFRESH_TOKEN_KEY } = require("~config/tokens.js");

exports.verifyRefresh = (user, token) => {
  try {
    const { username, userId, role } = jwt.verify(token, REFRESH_TOKEN_KEY);
    return (
      username === user.username && userId === user.userId && role === user.role
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};
