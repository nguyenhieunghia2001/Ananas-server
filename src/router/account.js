const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { validateLoginUser } = require("../validations/changePass");
const { validateEditAccountByAdmin } = require("../validations/account");
const checkValidate = require("../middlewares/checkValidateion");
const accountController = require("../app/Controllers/AccountController");

router.get("/getinfo", accountController.getAccountByEmail);
router.get("/getinfobyid/:id", accountController.getAccountById);
router.post(
  "/updateinfo",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  accountController.UpdateInfoAccount
);
router.post(
  "/updatepass",
  validateLoginUser,
  checkValidate,
  accountController.updatePassword
);

module.exports = router;
