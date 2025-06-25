const User = require("../models/user");

// SignUp Route:
module.exports.renderSignUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({
      username,
      email,
    });

    let user = await User.register(newUser, password);
    req.login(user, (err) => {
      if (err) {
        return next(err);
      } else {
        return res
          .status(200)
          .json({ message: "Signup successful", redirectUrl: "/" });
      }
    });
  } catch (er) {
    res.status(400).json({ error: er.message });
  }
};

// Login Route:
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  if (req.isAuthenticated()) {
    const user = {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
    };
    return res
      .status(200)
      .json({ message: "Login successful", redirectUrl: "/", user });
  } else {
    return res.status(401).json({ error: "Invalid username or password" });
  }
};

// Logout Route:
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      return res.status(200).json({ message: "Logout successful" });
    }
  });
};

// IsLoggedIn Route:
module.exports.isLoggedIn = (req, res) => {
  if (req.isAuthenticated()) {
    // User is logged in
    return res
      .status(200)
      .json({ message: "User is logged in.", loggedIn: true, username: req.user.username, role: req.user.role });
  } else {
    // User is not logged in
    return res.status(200).json({ message: "User is logged out.", loggedIn: false });
  }
};
