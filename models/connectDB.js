const mongoose = require("mongoose");

const DB_URL = `mongodb+srv://naji:PTzK026k6yR3R28Z@cluster0.5vjdf.mongodb.net/QuestionsTest?retryWrites=true&w=majority`;

const connectDB = (server) => {
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })

    .then(() => server())
    .catch((err) => console.log("err happened in db connection!", err));
};

module.exports = connectDB;
