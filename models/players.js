const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const players = new Schema({
  name: {
    type: String,
  },
});

const Players = mongoose.model("players", players);

module.exports = Players;
