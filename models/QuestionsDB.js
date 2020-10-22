const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionsSchema = new Schema({
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

const Questions = mongoose.model("questions", questionsSchema);

module.exports = Questions;
