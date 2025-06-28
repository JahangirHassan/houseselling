const express = require('express');
const router = express.Router();
const salesController = require('../controllers/sales');
const wrapAsync = require("../utils/wrapAsync");

// POST /sales
router.post('/createsale', wrapAsync(salesController.createSale));

// GET /sales
router.get('/getallsales', wrapAsync(salesController.getAllSales));

// GET /sales/summary
router.get('/summary', wrapAsync(salesController.getSalesSummary));

// GET /sales/user/:userId
router.get('/user/:userId', wrapAsync(salesController.getUserSales));

// DELETE /sales/:id
router.delete('/:id', wrapAsync(salesController.deleteSale));

// PUT /sales/:id
router.put('/:id', wrapAsync(salesController.updateSale));
 // POST /checkout
router.post("/checkout", wrapAsync(salesController.checkoutCart));

module.exports = router;


