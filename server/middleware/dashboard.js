module.exports = {
  validateUsers: (req, res, next) => {
    if (!req.body.username || req.body.username.length < 3) {
      return res.status(400).send({
        msg: "Please enter a username with min. 3 chars",
      });
    }
    if (!req.body.email || req.body.email.length < 3) {
      return res.status(400).send({
        msg: "Please enter a valid email adress",
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
  },
  validateOrganizations: (req, res, next) => {
    if (!req.body.organization_name) {
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
  },
  validateEvents: (req, res, next) => {
    if (!req.body.event_organization) {
      return res.status(400).send({
        msg: "Please enter a valid organization name",
      });
    }
    if (!req.body.event_title) {
      return res.status(400).send({
        msg: "Please enter a valid event title",
      });
    }
    if (!req.body.event_description) {
      return res.status(400).send({
        msg: "Please enter a valid event description",
      });
    }
    if (!req.body.event_start_date) {
      return res.status(400).send({
        msg: "Please enter a valid event start date",
      });
    }
    if (!req.body.event_end_date) {
      return res.status(400).send({
        msg: "Please enter a valid event end date",
      });
    }
    next();
  },
};
