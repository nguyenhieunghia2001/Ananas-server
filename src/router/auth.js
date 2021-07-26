const express = require("express");
const router = express.Router();
const authController = require("../app/Controllers/AuthController");
const {
  validateRegisterUser,
  validateLoginUser,
} = require("../validations/account");
const checkValidate = require("../middlewares/checkValidateion");
// const isAuth = require("../middlewares/isAuth");

// router.post('/login', authController.login);
router.post(
  "/login",

  validateLoginUser,
  checkValidate,
  async function (req, res, next) {
    console.log(req.body);
    next();
  },
  authController.login
);
router.post(
  "/register",
  validateRegisterUser,
  checkValidate,
  authController.register
);
//get infomation account active to set header client
router.get("/getInfoUserCurrent", authController.getInfoUserCurrent);

module.exports = router;
