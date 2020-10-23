const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const levelThree = new Schema({
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

const LevelThree = mongoose.model("lvelThree", levelThree);

module.exports = LevelThree;
