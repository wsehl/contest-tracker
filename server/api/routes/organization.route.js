const express = require("express");
// const validate = require("~services/validate");
const controller = require("../controllers/organization.controller");
// const { add } = require("../validations/organization.validation");

const router = express.Router();

router.route("/").get(controller.getAll).post(controller.addNew);

router.route("/:id").delete(controller.removeOne).put(controller.updateOne);

module.exports = router;
