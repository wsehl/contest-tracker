const Joi = require("joi");

module.exports = {
  add: Joi.object({
    event_start_date: Joi.string().required(),
    event_end_date: Joi.string().required(),
    event_title: Joi.string().required(),
    event_organization: Joi.string().required(),
    event_description: Joi.string(),
  }),
};
