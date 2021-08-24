const express = require('express')
const router = express.Router()
const orderController = require('../app/Controllers/OrderController')

router.get('/countstatus', orderController.getCountStatus);
router.get('/getall', orderController.getAll);
router.get('/:id', orderController.getOrderById);
router.get('/revenue/day', orderController.getRevenueDay);
router.get('/revenue/week', orderController.getRevenueWeek);
router.get('/revenue/month', orderController.getRevenueMonth);
router.get('/countstatus', orderController.getCountStatus);

module.exports = router;
