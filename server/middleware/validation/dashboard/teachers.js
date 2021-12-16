const validateTeachers = (req, res, next) => {
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
  if (!req.body.phone || req.body.phone.length === 10) {
    return res.status(400).send({
      msg: "Please enter a valid phone number",
    });
  }
  if (!req.body.subject_id) {
    return res.status(400).send({
      msg: "Please enter a valid project subject id",
    });
  }

  next();
};

module.exports = validateTeachers;
