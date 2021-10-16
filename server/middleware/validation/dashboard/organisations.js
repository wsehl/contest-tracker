const validateOrganisations = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({
      msg: "Please enter a valid organization name",
    });
  }
  if (!req.file) {
    return res.status(400).send({
      msg: "You must select a file",
    });
  }
  next();
};

module.exports = validateOrganisations;
