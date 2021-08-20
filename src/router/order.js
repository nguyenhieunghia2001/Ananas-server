const express = require('express')
const router = express.Router()
const orderController = require('../app/Controllers/OrderController')

router.get('/getall', orderController.getAll);
router.get('/:id', orderController.getOrderById);

module.exports = router;
