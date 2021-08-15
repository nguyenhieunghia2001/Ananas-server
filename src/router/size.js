const express = require('express')
const router = express.Router()
const sizeController = require('../app/Controllers/SizeController')

router.get('/all', sizeController.getAll);

module.exports = router;