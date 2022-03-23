const express = require("express");
const validate = require("~services/validate");
const controller = require("../controllers/teacher.controller");
const { add } = require("../validations/teacher.validation");

const router = express.Router();

router.route("/").get(controller.getAll).post(validate(add), controller.addNew);

router.route("/:id").get(controller.getOne).delete(controller.removeOne);

module.exports = router;
