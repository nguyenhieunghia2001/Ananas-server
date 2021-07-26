const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {validateLoginUser} = require('../validations/changePass')
const checkValidate = require('../middlewares/checkValidateion')
const accountController = require("../app/Controllers/AccountController");

router.get("/getinfo", accountController.getAccountByEmail);
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
router.post("/updatepass", validateLoginUser, checkValidate, accountController.updatePassword);

module.exports = router;
