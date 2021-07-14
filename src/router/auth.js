const express = require('express')
const router = express.Router()
const authController = require('../app/Controllers/AuthController')
const {validateRegisterUser} = require('../validations/account')
const checkValidate = require('../middlewares/checkValidateion')

// router.post('/login', authController.login);
router.post('/login', validateRegisterUser, checkValidate, authController.register);
router.post('/register', validateRegisterUser, checkValidate, authController.register);

module.exports = router;