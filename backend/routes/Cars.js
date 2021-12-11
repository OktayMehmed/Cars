const express = require("express");
const router = express.Router();
const {
  getCars,
  getCarsById,
  getUserCars,
  createCar,
  deleteCar,
  updateCar,
} = require("../controllers/Cars");
const protect = require("../middleware/auth");

router.route("/mycars").get(protect, getUserCars);
router.route("/").get(getCars).post(protect, createCar);
router
  .route("/:id")
  .get(getCarsById)
  .delete(protect, deleteCar)
  .put(protect, updateCar);

module.exports = router;
