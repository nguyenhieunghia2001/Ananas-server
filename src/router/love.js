const express = require('express')
const router = express.Router()
const loveController = require('../app/Controllers/LoveController')

router.get('/add', loveController.addProductLove);
router.get('/remove', loveController.deleteProductLove);

module.exports = router;
