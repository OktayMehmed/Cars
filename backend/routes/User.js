const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  authUser,
  registerUser,
  getUserProfile,
} = require("../controllers/User");

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile);

module.exports = router;
