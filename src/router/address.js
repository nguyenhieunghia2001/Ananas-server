const express = require('express')
const router = express.Router()
const addressController = require('../app/Controllers/AddressController')

router.get('/getAll', addressController.getAll);
router.post('/add', addressController.addAddress);
router.post('/update', addressController.updateAddress);

router.get('/remove/:id', addressController.removeAddress);
router.get('/changeactive/:id', addressController.changeActive);

module.exports = router;
