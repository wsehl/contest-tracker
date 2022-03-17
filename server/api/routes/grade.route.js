const express = require("express");
const validate = require("~services/validate");
const controller = require("../controllers/grade.controller");
const { add } = require("../validations/grade.validation");

const router = express.Router();

router.route("/").get(controller.getAll).post(validate(add), controller.addNew);

router.get("/:id", controller.getOne);

module.exports = router;
