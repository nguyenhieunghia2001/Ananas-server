const express = require('express')
const router = express.Router()
const statusController = require('../app/Controllers/StatusController')
const { validateStatus } = require("../validations/status");
const checkValidate = require("../middlewares/checkValidateion");
const isAuthAdmin = require('../middlewares/isAuthAdmin');

router.get('/all', statusController.getAll);
router.post("/add", isAuthAdmin, validateStatus, checkValidate, statusController.add);
router.post("/edit", isAuthAdmin, validateStatus, checkValidate, statusController.edit);
router.get("/:id", statusController.getCategoryById);

module.exports = router;