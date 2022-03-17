const Joi = require("joi");

module.exports = {
  add: Joi.object({
    name: Joi.string().required(),
    curator_id: Joi.string().required(),
  }),
};
