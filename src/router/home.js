const express = require('express')
const router = express.Router()
const homeController = require('../app/Controllers/HomeControler')

router.get('/', homeController.index);

module.exports = router;
