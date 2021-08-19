const express = require('express')
const router = express.Router()
const sizeController = require('../app/Controllers/SizeController')
const { validateSize } = require("../validations/size");
const checkValidate = require("../middlewares/checkValidateion");

router.get('/all', sizeController.getAll);
router.post("/add", validateSize, checkValidate, sizeController.add);
router.post("/edit", validateSize, checkValidate, sizeController.edit);
router.get("/:id", sizeController.getCategoryById);

module.exports = router;