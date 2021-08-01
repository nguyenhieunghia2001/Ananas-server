const express = require('express')
const router = express.Router()
const historyController = require('../app/Controllers/HistoryControler')

router.get('/', historyController.getProductsByEmail);
router.get('/add', historyController.addHistory);

module.exports = router;
