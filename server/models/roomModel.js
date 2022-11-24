const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: "string", unique: true },
  maxPop: Number,
  image: Buffer,
  pop: Array,
  messages: Array,
  roomCreator: { type: mongoose.Types.ObjectId, ref: "User" },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = { Room };
