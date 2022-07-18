const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: "string", unique: true },
  maxPop: Number,
  pop: Array,
  messages: Array,
  currentSong: String,
});

const Room = mongoose.model("Room", roomSchema);

module.exports = { Room };
