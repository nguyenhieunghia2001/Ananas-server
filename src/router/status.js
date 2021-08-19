const express = require('express')
const router = express.Router()
const statusController = require('../app/Controllers/StatusController')
const { validateStatus } = require("../validations/status");
const checkValidate = require("../middlewares/checkValidateion");

router.get('/all', statusController.getAll);
router.post("/add", validateStatus, checkValidate, statusController.add);
router.post("/edit", validateStatus, checkValidate, statusController.edit);
router.get("/:id", statusController.getCategoryById);

module.exports = router;