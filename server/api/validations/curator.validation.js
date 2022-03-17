const Joi = require("joi");

module.exports = {
  add: Joi.object({
    first_name: Joi.string().required(),
    middle_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone: Joi.string().required(),
  }),
};
