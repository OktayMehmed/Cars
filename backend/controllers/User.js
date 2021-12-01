const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc Auth User
// @route POST /api/users/login
// @access Public
const authUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => Promise.all([user, user.matchPassword(password)]))
    .then(([user, match]) => {
      if (user && match) {
        res.json({
          _id: user._id,
          email: user.email,
          name: user.name,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    })
    .catch(() => {
      res.status(401).json({ message: "Invalid email or password" });
    });
};

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      res.json({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
    .catch(() => res.status(404).json({ message: "User not found" }));
};

module.exports = { authUser, getUserProfile };
