require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const listings = require("./routes/listing");
const users = require("./routes/user");
const carts = require("./routes/cart");
const admins = require("./routes/admin");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user");
const cors = require('cors');

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend origin
    credentials: true, // Allow credentials
}));
app.use(express.json());


const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

// Using Passport Middleware after Session:
// it will create Authentication to the user Login:
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.listen(8080, () => {
    console.log("app is listing on port: 8080");
});

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderapp";

async function main() {
    await mongoose.connect(MONGO_URL);
};

main()
    .then(() => {
        console.log("Connected!");
    });

// Middleware to implement Connect-Flash: 
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


// Using Carts here through Express Router:
app.use("/admin/users", admins);

// Using Listings here through Express Router:
app.use("/listings", listings);

// Using Users here through Express Router:
app.use("/", users);

// Using Carts here through Express Router:
app.use("/", carts);




app.get("/", (req, res) => {
    res.redirect("/listings");
});


// Handle undefined Routes(paths) Middleware:
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

// Error Handling Middleware:
app.use((err, req, res, next) => {
    let { status = 500, message = "Somethig went Wrong" } = err;
    res.status(status).json({ message });
});