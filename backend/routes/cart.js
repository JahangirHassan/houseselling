const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const wrapAsync = require("../utils/wrapAsync");

// Create Cart Route:
router.post("/cart", wrapAsync(cartController.createCart));

// Read Cart Route:
router.get("/cart/:userId", wrapAsync(cartController.readCart));

// Delete Cart Route:
// Remove Item from Cart
router.delete("/cart/:userId/:productId", wrapAsync(cartController.delCart));

module.exports = router;
