const express = require("express");
const router = express.Router();
const categoryController = require("../app/Controllers/CategoryController");
const { validateCategory } = require("../validations/category");
const checkValidate = require("../middlewares/checkValidateion");
const isAuthAdmin = require("../middlewares/isAuthAdmin");

router.get("/all", categoryController.getAll);
router.post("/add", isAuthAdmin, validateCategory, checkValidate, categoryController.add);
router.post("/edit", isAuthAdmin, validateCategory, checkValidate, categoryController.edit);
router.get("/:id", categoryController.getCategoryById);

module.exports = router;
