const User = require("../models/User");

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
          token: null,
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    })
    .catch(() => {
      res.status(401).json({ message: "Invalid email or password" });
    });
};

module.exports = { authUser };
