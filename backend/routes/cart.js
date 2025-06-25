const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");

// Create Cart Route:
router.post("/cart", cartController.createCart);

// Read Cart Route:
router.get("/cart/:userId", cartController.readCart);

// Delete Cart Route:
// Remove Item from Cart
router.delete("/cart/:userId/:productId", cartController.delCart);

module.exports = router;
