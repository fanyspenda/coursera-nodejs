const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishScema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

let Dishes = mongoose.model("dish", dishScema);

module.exports = Dishes;
