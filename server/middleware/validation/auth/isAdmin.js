const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRET_KEY;

const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, SECRETKEY);
    if (decoded.role != "Admin") {
      console.info(
        `Permission denied: for [${decoded.username}] with role: [${
          decoded.role
        }] at [${new Date().toLocaleString("ru-RU", {
          timeZone: "Asia/Almaty",
        })}]`
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
};

module.exports = isAdmin;
