const mongoose = require("mongoose");
const { ObjectId } = mongoose.SchemaTypes;

const carsSchema = mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },

    make: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    fuel: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    power: {
      type: Number,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

const Cars = mongoose.model("Cars", carsSchema);
module.exports = Cars;
