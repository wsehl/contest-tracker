const validateGrades = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({
      msg: "Please enter a valid grade name",
    });
  }
  if (!req.body.curator) {
    return res.status(400).send({
      msg: "Please enter a valid curator",
    });
  }

  next();
};

module.exports = validateGrades;
