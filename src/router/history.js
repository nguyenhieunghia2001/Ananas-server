const express = require('express')
const router = express.Router()
const historyController = require('../app/Controllers/HistoryControler')

router.get('/getproducts', historyController.getProductsByEmail);
module.exports = router;
