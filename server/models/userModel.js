const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: "string", unique: true },
  email: { type: "string", unique: true },
  password: String,
  profilePicture: Buffer,
  rooms: [{ type: mongoose.Types.ObjectId, required: true, ref: "Room" }],
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
