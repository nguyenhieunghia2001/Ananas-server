const express = require("express");
const router = express.Router();
const { validateEditAccountByAdmin } = require("../validations/account");
const checkValidate = require("../middlewares/checkValidateion");
const accountController = require("../app/Controllers/AccountController");

router.get("/getall", accountController.getAllAccount);
router.get("/getinfo", accountController.getAccountByEmail);
router.get("/getinfobyid/:id", accountController.getAccountById);
router.post(
  "/editbyadmin",
  validateEditAccountByAdmin,
  checkValidate,
  accountController.editByAdmin
);

module.exports = router;
