const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { authUser, getUserProfile } = require("../controllers/User");

router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile);

module.exports = router;
