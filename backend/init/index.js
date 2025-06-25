const mongoose = require("mongoose");
const Listing = require("../models/listing");
const data = require("./data");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderapp";

async function main() {
    await mongoose.connect(MONGO_URL);
};

main()
.then(() => {
    console.log("Connected!");
});

const initData = async () => {
    await Listing.deleteMany({});
    // Adding Owner for each listing:
    data.data = data.data.map((obj) => ({ ...obj, owner: "66ff04c1d55efb91053bc7bd" }));
    await Listing.insertMany(data.data);
    console.log("Data is Inserted!");
};

initData();