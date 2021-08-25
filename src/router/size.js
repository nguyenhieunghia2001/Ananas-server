const express = require("express");
const router = express.Router();
const sizeController = require("../app/Controllers/SizeController");
const { validateSize } = require("../validations/size");
const checkValidate = require("../middlewares/checkValidateion");
const isAuthAdmin = require("../middlewares/isAuthAdmin");

router.get("/all", sizeController.getAll);
router.post(
  "/add",
  isAuthAdmin,
  validateSize,
  checkValidate,
  sizeController.add
);
router.post(
  "/edit",
  isAuthAdmin,
  validateSize,
  checkValidate,
  sizeController.edit
);
router.get("/:id", sizeController.getCategoryById);

module.exports = router;
