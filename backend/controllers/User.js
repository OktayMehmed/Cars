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

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).then((userExist) => {
    if (userExist) {
      res.status(400).json({ message: "User already exist" });
      return;
    } else {
      User.create({
        name,
        email,
        password,
      })
        .then((user) => {
          if (user) {
            res.status(201).json({
              _id: user._id,
              email: user.email,
              name: user.name,
              token: generateToken(user._id),
            });
          } else {
            res.status(400).json({ message: "Invalid user data" });
          }
        })
        .catch((e) => res.status(400).json(e));
    }
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

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      user.save().then((updatedUser) => {
        res.json({
          _id: updatedUser._id,
          email: updatedUser.email,
          name: updatedUser.name,
          token: generateToken(updatedUser._id),
        });
      });
    })
    .catch(() => res.status(404).json({ message: "User not found" }));
};

module.exports = { authUser, registerUser, getUserProfile, updateUserProfile };
