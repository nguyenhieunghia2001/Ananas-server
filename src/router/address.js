const express = require('express')
const router = express.Router()
const addressController = require('../app/Controllers/AddressController')

router.get('/getAll', addressController.getAll);
router.post('/add', addressController.addAddress);

module.exports = router;
