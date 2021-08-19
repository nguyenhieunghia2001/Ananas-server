const express = require("express");
const router = express.Router();
const categoryController = require("../app/Controllers/CategoryController");
const { validateCategory } = require("../validations/category");
const checkValidate = require("../middlewares/checkValidateion");

router.get("/all", categoryController.getAll);
router.post("/add", validateCategory, checkValidate, categoryController.add);
router.post("/edit", categoryController.edit);
router.get("/:id", categoryController.getCategoryById);

module.exports = router;
