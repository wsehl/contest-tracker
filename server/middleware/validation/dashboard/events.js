const validateEvents = (req, res, next) => {
  Date.prototype.isValid = function () {
    return this.getTime() === this.getTime();
  };

  req.body.event_start_date = new Date(req.body.event_start_date);
  req.body.event_end_date = new Date(req.body.event_end_date);

  if (!req.body.event_title) {
    return res.status(400).send({
      msg: "Please enter a valid event title",
    });
  }
  if (!req.body.event_organization) {
    return res.status(400).send({
      msg: "Please enter a valid organization name",
    });
  }
  if (!req.body.event_description) {
    return res.status(400).send({
      msg: "Please enter a valid event description",
    });
  }
  if (!req.body.event_start_date || !req.body.event_start_date.isValid()) {
    return res.status(400).send({
      msg: "Please enter a valid event start date",
    });
  }
  if (!req.body.event_end_date || !req.body.event_end_date.isValid()) {
    return res.status(400).send({
      msg: "Please enter a valid event end date",
    });
  }
  next();
};

module.exports = validateEvents;
