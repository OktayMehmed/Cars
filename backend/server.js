const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cars = require("./data/cars");

dotenv.config();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/cars", (req, res) => {
  res.json(cars);
});

app.get("/api/cars/:id", (req, res) => {
  const car = cars.find((c) => c._id === req.params.id);
  res.json(car);
});

const port = process.env.PORT || 8000;

app.listen(port, console.log(`Server is running on port ${port}!`));
