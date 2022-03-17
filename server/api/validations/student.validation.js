const Joi = require("joi");

module.exports = {
  add: Joi.object({
    grade_id: Joi.string().required(),
    first_name: Joi.string().required(),
    middle_name: Joi.string().required(),
    last_name: Joi.string().required(),
    study_lang: Joi.string(),
  }),
};
