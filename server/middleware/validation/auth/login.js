const validateLogin = (req, res, next) => {
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
};

module.exports = validateLogin;
