const express = require("express");
// const validate = require("~services/validate");
const controller = require("../controllers/organization.controller");
// const { add } = require("../validations/organization.validation");

const router = express.Router();

router.route("/").get(controller.getAll).post(controller.addNew);

// router.get("/:id", controller.getOne);

module.exports = router;
