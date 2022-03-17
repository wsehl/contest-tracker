const Joi = require("joi");

module.exports = {
  register: Joi.object({
    username: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(128),
    password_repeat: Joi.ref("password"),
  }),
  login: Joi.object({
    username: Joi.string().alphanum().required(),
    password: Joi.string().required().min(6).max(128),
  }),
};
