const express = require('express')
const router = express.Router()
const puchaseController = require('../app/Controllers/PurchaseController')

router.get('/', puchaseController.getAll);

module.exports = router;