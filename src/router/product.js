const express = require('express')
const router = express.Router()
const productController = require('../app/Controllers/ProductController')

router.get('/all', productController.getAll);

module.exports = router;