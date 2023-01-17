const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.get('/', salesController.listSales);
router.get('/:id', salesController.getSales);
router.post('/', salesController.addSales);
router.delete('/:id', salesController.deleteSale);
router.put('/:id', salesController.updateSale);

module.exports = router;