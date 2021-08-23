const express = require('express')
const router = express.Router()
const orderController = require('../app/Controllers/OrderController')

router.get('/getall', orderController.getAll);
router.get('/:id', orderController.getOrderById);
router.get('/revenue/day', orderController.getRevenueDay);
router.get('/revenue/month', orderController.getRevenueMonth);

module.exports = router;
