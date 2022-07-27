const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: "string", unique: true },
  email: { type: "string", unique: true },
  password: String,
  profilePictureUrl: String,
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
