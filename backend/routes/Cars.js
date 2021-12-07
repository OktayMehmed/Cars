const express = require("express");
const router = express.Router();
const { getCars, getCarsById, getUserCars } = require("../controllers/Cars");
const protect = require("../middleware/auth");

router.route("/mycars").get(protect, getUserCars);
router.route("/").get(getCars);
router.route("/:id").get(getCarsById);

module.exports = router;
