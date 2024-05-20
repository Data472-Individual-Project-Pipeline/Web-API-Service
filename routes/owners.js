const express = require('express');
const router = express.Router();
const OwnerController = require('../controllers/OwnerController');

router.get('/', OwnerController.getAllOwners);

module.exports = router;
