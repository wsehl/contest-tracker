const Joi = require("joi");

module.exports = {
  add: Joi.object({
    project_id: Joi.string().required(),
    event_id: Joi.string().required(),
    place: Joi.string().required(),
    description: Joi.string().required(),
  }),
};
