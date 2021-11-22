const mongoose = require("mognoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const users = require("./data/users");
const cars = require("./data/cars");
const User = require("./models/User");
const Cars = require("./models/Cars");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Cars.deleteMany();

    const createdUsers = await User.insertMany(users);

    const createdPosts = createdUsers[0]._id;

    const car = cars.map((car) => {
      return { ...car, user: createdPosts };
    });

    await Cars.insertMany(car);

    console.log("Data imported!!!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Cars.deleteMany();

    console.log("Data is deleted!!!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
