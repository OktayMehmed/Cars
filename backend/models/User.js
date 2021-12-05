const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is taken"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }
  bcrypt.genSalt(10).then((salt) => {
    bcrypt.hash(this.password, salt).then((hash) => {
      this.password = hash
      next();
    }).catch(e => console.log(e))
  });
});

const User = mongoose.model("User", userSchema);
module.exports = User;
