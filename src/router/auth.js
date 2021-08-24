const express = require("express");
const router = express.Router();
const authController = require("../app/Controllers/AuthController");
const {
  validateRegisterUser,
  validateLoginUser,
} = require("../validations/account");
const checkValidate = require("../middlewares/checkValidateion");
const isAuth = require("../middlewares/isAuth");

// router.post('/login', authController.login);
router.post("/login", validateLoginUser, checkValidate, authController.login);
router.post("/loginadmin", validateLoginUser, checkValidate, authController.loginAdmin);
router.post(
  "/register",
  validateRegisterUser,
  checkValidate,
  authController.register
);
router.get("/logout", authController.logput);
//get infomation account active to set header client
router.get("/getInfoUserCurrent", isAuth, authController.getInfoUserCurrent);

module.exports = router;
