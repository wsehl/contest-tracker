const validateStudents = (req, res, next) => {
  if (!req.body.grade_id) {
    return res.status(400).send({
      msg: "Please enter a valid grade id",
    });
  }
  if (!req.body.first_name || req.body.first_name.length > 40) {
    return res.status(400).send({
      msg: "Please enter a valid first name",
    });
  }
  if (!req.body.middle_name || req.body.first_name.length > 40) {
    return res.status(400).send({
      msg: "Please enter a valid middle name",
    });
  }
  if (!req.body.last_name || req.body.first_name.length > 40) {
    return res.status(400).send({
      msg: "Please enter a valid last name",
    });
  }
  if (!req.body.study_lang) {
    return res.status(400).send({
      msg: "Please enter a valid study language",
    });
  }

  next();
};

module.exports = validateStudents;
