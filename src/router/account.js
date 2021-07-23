const express = require('express')
const router = express.Router()
const accountController = require('../app/Controllers/AccountController')

router.get('/getinfo', accountController.getAccountByEmail);

module.exports = router;
