const Joi = require("joi");

module.exports = {
  add: Joi.object({
    start_date: Joi.required(),
    end_date: Joi.required(),
    name: Joi.required(),
    description: Joi.required(),
    teacher_id: Joi.required(),
    students_ids: Joi.required(),
    subject_id: Joi.required(),
  }),
};
