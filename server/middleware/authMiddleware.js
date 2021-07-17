const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRET_KEY;

module.exports = {
  validateLogin: (req, res, next) => {
    if (!req.body.username) {
      return res.status(422).send({
        msg: "Please enter a username ",
      });
    }
    if (!req.body.password) {
      return res.status(422).send({
        msg: "Please enter a password",
      });
    }
    next();
  },
  validateRegister: (req, res, next) => {
    if (!req.body.username || req.body.username.length < 3) {
      return res.status(422).send({
        msg: "Please enter a username with min. 3 chars",
      });
    }
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(422).send({
        msg: "Please enter a password with min. 6 chars",
      });
    }
    if (!req.body.password_repeat || req.body.password != req.body.password_repeat) {
      return res.status(422).send({
        msg: "Both passwords must match",
      });
    }
    next();
  },
  isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, SECRETKEY);
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: "Your session is not valid!",
      });
    }
  },
  isAdmin: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, SECRETKEY);
      if (decoded.role != "Admin") {
        console.info(
          `Permission denied: for [${decoded.username}] with role: [${decoded.role}] at [${new Date().toLocaleString(
            "ru-RU",
            {
              timeZone: "Asia/Almaty",
            }
          )}]`
        );
        return res.status(403).send({
          msg: "Permission denied!",
        });
      } else {
        next();
      }
    } catch (err) {
      console.info(
        `Session is not valid denied at [${new Date().toLocaleString("ru-RU", {
          timeZone: "Asia/Almaty",
        })}]`
      );
      return res.status(401).send({
        msg: "Your session is not valid!",
      });
    }
  },
};
