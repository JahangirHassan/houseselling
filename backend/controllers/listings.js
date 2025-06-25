const Listing = require("../models/listing");

// Index Route Code:
module.exports.index = async (req, res) => {
  try {
    const listings = await Listing.find({});
    res.json(listings); // Send listings as JSON response
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch listings" });
  }
};

// Create Route Code:
module.exports.createListing = async (req, res) => {

  let url = req.file.path;
  let filename = req.file.filename;

  let newListing = req.body.listing; // same work as above line code.
  newListing.owner = req.body.owner;
  let listing = new Listing(newListing);
  listing.image = { url, filename };
  await listing.save();
  res.status(200).json({ message: "Listing created successfully", listing });
};

// Get all listings by a specific user
module.exports.getUserListings = async (req, res) => {
  const { userId } = req.params;

  try {
    const listings = await Listing.find({ owner: userId });

    if (!listings || listings.length === 0) {
      return res.status(404).json({ message: "No listings found for this user." });
    }

    res.status(200).json(listings);
  } catch (err) {
    console.error("Error fetching user's listings:", err);
    res.status(500).json({ error: "Failed to fetch user's listings" });
  }
};


// Read Route Code:
module.exports.readListing = async (req, res) => {
  let { id } = req.params;
  try {
    let listing = await Listing.findById(id).populate("owner");

    // Check if the listing was found
    if (!listing) {
      return res.status(404).json({ message: "Listing does not exist!" }); // 404 for resource not found
    }

    // Send the found listing
    res.json(listing);
  } catch (err) {
    // Handle unexpected errors, like database connection issues
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Update Route Code:

module.exports.updateListing = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      { new: true }
    );
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    // Upload new image if provided
    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
      await listing.save();
    }
    res.status(200).json({ message: "Listing updated successfully", listing });
  } catch (err) {
    console.error("Error updating listing:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Route Code:
module.exports.deleteListing = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findByIdAndDelete(id);

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    // Successfully deleted, respond with success message
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error("Error deleting listing:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
