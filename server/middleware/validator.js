const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body("username", "Username is not valid").isLength({ min: 5 }),
    body("password", "Password is not valid").isLength({ min: 5 }),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    msg: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};
