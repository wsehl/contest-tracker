const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateRegister = (req, res, next) => {
  const { username, password, password_repeat, email } = req.body;
  if (!username || username.length < 3) {
    return res.status(422).send({
      msg: "Please enter a username with min. 3 chars",
    });
  }
  if (!password || password.length < 6) {
    return res.status(422).send({
      msg: "Please enter a password with min. 6 chars",
    });
  }
  if (!password_repeat || password != password_repeat) {
    return res.status(422).send({
      msg: "Both passwords must match",
    });
  }
  if (!email || !validateEmail(email)) {
    return res.status(422).send({
      msg: "Please enter a valid email",
    });
  }
  next();
};

module.exports = validateRegister;
