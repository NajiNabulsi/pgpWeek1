const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const levelTwo = new Schema({
  num: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: Number,
    required: true,
  },
});

const LevelTwo = mongoose.model("lvelTwo", levelTwo);

module.exports = LevelTwo;
