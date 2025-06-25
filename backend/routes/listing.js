// Using Express Router:

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateSchema } = require("../middlewares");
const listingController = require("../controllers/listings");
const multer = require('multer');
const { storage } = require("../cloudConfig");
const upload = multer({ storage });



// Index Route:
router.get("/", wrapAsync(listingController.index));

// Create Route:
router.post("/", upload.single("listing[image]"), wrapAsync(listingController.createListing));

// Route to get all listings created by a specific user
router.get("/user/:userId", wrapAsync(listingController.getUserListings));


// Read Route:
router.get("/:id", wrapAsync(listingController.readListing));

// Update Route:
router.put("/:id", upload.single("listing[image]"), wrapAsync(listingController.updateListing));

// Delete Route:
router.delete("/:id", wrapAsync(listingController.deleteListing));

module.exports = router;