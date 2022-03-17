const express = require("express");
const validate = require("~services/validate");
const controller = require("../controllers/user.controller");
const { add } = require("../validations/user.validation");

const router = express.Router();

router.route("/").get(controller.getAll).post(validate(add), controller.addNew);

router
  .route("/:id")
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.removeOne);

module.exports = router;
