const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const Cars = require("./routes/Cars");
const { notFound, errorHandler } = require("./middleware/errors");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/cars", Cars);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, console.log(`Server is running on port ${port}!`));
