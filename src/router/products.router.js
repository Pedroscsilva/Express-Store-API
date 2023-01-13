const express = require('express');
const productController = require('../controllers/products.controller');

const router = express.Router();

router.get('/', productController.listPassengers);
router.get('/:id', productController.getPassenger);

module.exports = router;