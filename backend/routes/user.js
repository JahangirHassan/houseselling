// Using Express Router:

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");
const userController = require("../controllers/users");

// Signup Route:
router.get("/signup", userController.renderSignUpForm);

router.post("/signup", wrapAsync ( userController.signUp));

// Login Route:
router.get("/login", userController.renderLoginForm);

router.post("/login", saveRedirectUrl , passport.authenticate( "local" , { failureRedirect: "/login", failureFlash: false }) , wrapAsync ( userController.login));

// LogOut Route:
router.get("/logout", userController.logout);

// Is loggedIn Route:
router.get("/is-logged-in", userController.isLoggedIn);

module.exports = router;