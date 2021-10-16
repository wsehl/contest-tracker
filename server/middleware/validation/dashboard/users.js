const validateUsers = (req, res, next) => {
  if (!req.body.username || req.body.username.length < 3) {
    return res.status(400).send({
      msg: "Please enter a username with min. 3 chars",
    });
  }
  if (!req.body.email || req.body.email.length < 3) {
    return res.status(400).send({
      msg: "Please enter a valid email address",
    });
  }
  if (!req.body.role) {
    return res.status(400).send({
      msg: "Please select a role",
    });
  }
  if (!req.body.password || req.body.password.length < 6) {
    return res.status(400).send({
      msg: "Please enter a password with min. 6 chars",
    });
  }
  next();
};
module.exports = validateUsers;
