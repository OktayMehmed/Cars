const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const Cars = require("./routes/Cars");
const User = require("./routes/User");
const Upload = require("./routes/Upload");
const { notFound, errorHandler } = require("./middleware/errors");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/cars", Cars);
app.use("/api/users", User);
app.use("/api/upload", Upload);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, console.log(`Server is running on port ${port}!`));
