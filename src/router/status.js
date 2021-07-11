const express = require('express')
const router = express.Router()
const statusController = require('../app/Controllers/StatusController')

router.get('/all', statusController.getAll);

module.exports = router;