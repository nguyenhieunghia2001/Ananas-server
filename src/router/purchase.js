const express = require('express')
const router = express.Router()
const puchaseController = require('../app/Controllers/PurchaseController')

router.post('/add', puchaseController.addPurchase);

module.exports = router;
