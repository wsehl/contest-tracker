const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).send({
      msg: "Your session is not valid!",
    });
  }
};

module.exports = isLoggedIn;
