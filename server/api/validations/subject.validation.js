const Joi = require("joi");

module.exports = {
  add: Joi.object({
    name: Joi.string().required(),
  }),
};
