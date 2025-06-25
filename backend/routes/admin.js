const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const { isAdmin } = require("../middlewares");
const wrapAsync = require("../utils/wrapAsync");

// Get all Users:
router.get("/", wrapAsync(adminController.getUsers));

// Update User Role:
router.put("/:id", wrapAsync(adminController.updateUser));

// Delete Users:
router.delete("/:id", wrapAsync(adminController.delUser));

module.exports = router;