const jwt = require("jsonwebtoken");
const logger = require("~services/logger");

const SECRET_KEY = process.env.SECRET_KEY;

exports.isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { role, username } = jwt.verify(token, SECRET_KEY);

    if (role != "Admin") {
      logger.info(`Permission denied: for [${username}] with role: [${role}]`);
      return res.status(403).send({
        msg: "Доступ запрещен!",
      });
    } else {
      next();
    }
  } catch (err) {
    logger.info("Error: [isAdmin]");
    return res.status(401).send({
      msg: "Сессия не валидна!",
    });
  }
};

exports.isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).send({
      msg: "Сессия не валидна!",
    });
  }
};
