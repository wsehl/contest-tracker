const validateProjects = (req, res, next) => {
  Date.prototype.isValid = function () {
    return this.getTime() === this.getTime();
  };

  req.body.start_date = new Date(req.body.start_date);
  req.body.end_date = new Date(req.body.end_date);

  if (!req.body.name) {
    return res.status(400).send({
      msg: "Please enter a valid project name",
    });
  }
  if (!req.body.description) {
    return res.status(400).send({
      msg: "Please enter a valid project description",
    });
  }
  if (!req.body.start_date || !req.body.start_date.isValid()) {
    return res.status(400).send({
      msg: "Please enter a valid project start date",
    });
  }
  if (!req.body.end_date || !req.body.end_date.isValid()) {
    return res.status(400).send({
      msg: "Please enter a valid project end date",
    });
  }
  if (!req.body.teacher_id) {
    return res.status(400).send({
      msg: "Please enter a valid teacher id",
    });
  }
  if (!req.body.students_ids || !req.body.students_ids.length) {
    return res.status(400).send({
      msg: "Please enter a valid project students list",
    });
  }
  next();
};

module.exports = validateProjects;
