const express = require('express')
const router = express.Router()
const orderController = require('../app/Controllers/OrderController')

router.get('/getall', orderController.getAll);

module.exports = router;
