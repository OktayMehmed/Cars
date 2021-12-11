const Cars = require("../models/Cars");

// @desc Fetch all cars
// @route GET /api/cars
// @access Public
const getCars = (req, res) => {
  Cars.find({}).then((cars) => res.json(cars));
};

// @desc Fetch single car
// @route GET /api/cars/:id
// @access Public
const getCarsById = (req, res) => {
  Cars.findById(req.params.id)
    .then((car) => res.json(car))
    .catch(() => res.status(404).json({ message: "Car not found" }));
};

// @desc Get logged in user cars
// @route GET /api/cars/mycars
// @access Private
const getUserCars = (req, res) => {
  Cars.find({ user: req.user._id })
    .then((cars) => res.json(cars))
    .catch((e) => res.json(e));
};

// @desc Create new car
// @route POST /api/cars
// @access Private
const createCar = (req, res) => {
  const {
    make,
    model,
    image,
    price,
    year,
    fuel,
    color,
    power,
    phone,
    description,
  } = req.body;

  const car = new Cars({
    user: req.user._id,
    make: make,
    model: model,
    image: image,
    price: price,
    year: year,
    fuel: fuel,
    color: color,
    power: power,
    phone: phone,
    description: description,
  });

  car
    .save()
    .then((createdCar) => res.status(201).json(createdCar))
    .catch((e) => res.status(400).json({ message: "Please enter all fields" }));
};

// @desc Delete a car
// @route DELETE /api/cars/:id
// @access Private
const deleteCar = (req, res) => {
  Cars.findById(req.params.id)
    .then((car) => {
      car.remove();
      res.json({ message: "Car was been deleted" });
    })
    .catch(() => res.status(404).json({ message: "Car not found" }));
};

// @desc Update a car
// @route PUT /api/cars/:id
// @access Private
const updateCar = (req, res) => {
  const {
    make,
    model,
    image,
    price,
    year,
    fuel,
    color,
    power,
    phone,
    description,
  } = req.body;

  Cars.findById(req.params.id)
    .then((car) => {
      car.make = make;
      car.model = model;
      car.image = image;
      car.price = price;
      car.year = year;
      car.fuel = fuel;
      car.color = color;
      car.power = power;
      car.phone = phone;
      car.description = description;

      car
        .save()
        .then((updatedCar) => res.json(updatedCar))
        .catch(() =>
          res.status(400).json({ message: "Please enter all fields" })
        );
    })
    .catch(() => res.status(404).json({ message: "Car not found" }));
};

module.exports = {
  getCars,
  getCarsById,
  getUserCars,
  createCar,
  deleteCar,
  updateCar,
};
