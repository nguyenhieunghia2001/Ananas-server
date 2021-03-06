const express = require('express')
const router = express.Router()
const cartController = require('../app/Controllers/CartController')

router.get('/', cartController.getAllProductCart);
router.get('/add/:id', cartController.addProductToCart);
router.get('/remove/:id', cartController.removeProductToCart);
router.get('/update/:id', cartController.updateSizeQuantity);

module.exports = router;
