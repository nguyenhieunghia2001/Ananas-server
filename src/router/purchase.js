const express = require('express')
const router = express.Router()
const puchaseController = require('../app/Controllers/PurchaseController')

router.get('/', puchaseController.getAll);
router.get('/detail/:id', puchaseController.getPurchaseById);
router.post('/add', puchaseController.addPurchase);

module.exports = router;
