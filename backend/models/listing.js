// Creating Schema for Listings:

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});


const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;