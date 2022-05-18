const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_KEY } = require("~config/tokens.js");

exports.isLoggedIn = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      return res.status(403).send({
        msg: "Token is missing!",
      });
    }

    jwt.verify(token, ACCESS_TOKEN_KEY, (err, user) => {
      if (err) return res.sendStatus(401);
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(401).send({
      msg: "Сессия не валидна!",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "Admin") {
      return res.sendStatus(401);
    } else {
      next();
    }
  } catch {
    return res.sendStatus(401);
  }
};
