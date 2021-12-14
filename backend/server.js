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

app.use("/api/cars", Cars);
app.use("/api/users", User);
app.use("/api/uploads", Upload);

__dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, console.log(`Server is running on port ${port}!`));
