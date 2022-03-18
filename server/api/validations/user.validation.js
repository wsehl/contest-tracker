const Joi = require("joi");

module.exports = {
  add: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().required(),
    password: Joi.string().required(),
    teacher_id: Joi.string(),
    curator_id: Joi.string(),
    student_id: Joi.string(),
  }),
};
