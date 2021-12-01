const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      User.findById(decoded.id)
        .select("-password")
        .then((user) => {
          req.user = user;
          next();
        });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "No authorizated, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No authorizated, no token" });
  }
};

module.exports = protect;
