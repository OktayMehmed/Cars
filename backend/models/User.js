const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
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
