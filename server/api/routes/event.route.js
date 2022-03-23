const express = require("express");
const validate = require("~services/validate");
const controller = require("../controllers/event.controller");
const { add } = require("../validations/event.validation");
const { isLoggedIn, isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

router
  .route("/")
  .get(controller.getAll)
  .post(isLoggedIn, isAdmin, validate(add), controller.addNew);

router
  .route("/:id")
  .get(isLoggedIn, isAdmin, controller.getOne)
  .put(isLoggedIn, isAdmin, controller.updateOne)
  .delete(isLoggedIn, isAdmin, controller.removeOne);

module.exports = router;
