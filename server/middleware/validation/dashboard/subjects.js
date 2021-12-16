const validateSubjects = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({
      msg: "Please enter a valid organization name",
    });
  }

  next();
};

module.exports = validateSubjects;
