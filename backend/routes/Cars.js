const express = require("express");
const router = express.Router();
const Cars = require("../models/Cars");

// @desc Fetch all cars
// @route GET /api/cars
// @access Public
router.get("/", (req, res) => {
  Cars.find({}).then((cars) => res.json(cars));
});

// @desc Fetch single car
// @route GET /api/cars/:id
// @access Public
router.get("/:id", (req, res) => {
  Cars.findById(req.params.id)
    .then((car) => res.json(car))
    .catch(() => res.status(404).json({ message: "Car not found" }));
});

module.exports = router;
