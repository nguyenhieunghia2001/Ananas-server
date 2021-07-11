const express = require('express')
const router = express.Router()
const categoryController = require('../app/Controllers/CategoryController')

router.get('/all', categoryController.getAll);

module.exports = router;