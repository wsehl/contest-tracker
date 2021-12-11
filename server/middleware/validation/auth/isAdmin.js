const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const logger = require("~utils/logger");

const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { role, username } = jwt.verify(token, SECRET_KEY);
    if (role != "Admin") {
      logger.info(`Permission denied: for [${username}] with role: [${role}]`);
      return res.status(403).send({
        msg: "Permission denied!",
      });
    } else {
      next();
    }
  } catch (err) {
    logger.info(`Session is not valid`);
    return res.status(401).send({
      msg: "Your session is not valid!",
    });
  }
};

module.exports = isAdmin;
