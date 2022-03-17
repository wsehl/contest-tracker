const express = require("express");
const validate = require("~services/validate");
const controller = require("../controllers/user.controller");
const { add } = require("../validations/user.validation");

const router = express.Router();

router
  .route("/")
  .get(controller.getAll)
  .post(validate(add), controller.addNew)
  .put(controller.updateOne)
  .delete(controller.removeOne);

router.get("/:id", controller.getOne);

module.exports = router;
