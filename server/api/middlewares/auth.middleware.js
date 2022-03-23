const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

exports.isLoggedIn = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
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
      return res.sendStatus(403);
    } else {
      next();
    }
  } catch {
    return res.sendStatus(401);
  }
};
