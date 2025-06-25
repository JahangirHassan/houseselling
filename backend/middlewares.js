const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");
const { listingSchema } = require("./schema");


// Middleware for server-side validation for Listings:
module.exports.validateSchema = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if( error ) {
        // let errMsg = error.details.map((el) => el.message).join(",");
        // throw new ExpressError(400, errMsg);
        throw new ExpressError(400, error);
    } else {
        next();
    };
};


// it will Authenticate to require that user is logged in to create new listing:
module.exports.isLoggedIn = (req, res, next) => {
    if ( !req.isAuthenticated() ) {
        req.session.redirectUrl = req.originalUrl;
    return res.status(400).json({ message: "You must be Logged in!" });
    } else {
        next();
    }
};

// Middleware to redirect page into its required direction:
// like if user want to create new listing and login is required then after login page is directly redirect ot login page.
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// Middleware to allow to edit or delete only the owner of its listing:
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
    return res.status(500).json({ message: "You are not owner of this Listing!" });
    }
    next();
};

// it will ensure logic for Admin:
module.exports.isAdmin = (req, res, next) => {
    if (!res.locals.currUser || res.locals.currUser.role !== "admin") {
    return res.status(404).json({ message: "You are not admin" });
    } else {
        next();
    };
};
