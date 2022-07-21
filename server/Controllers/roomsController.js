const { Room } = require("../models/roomModel.js");

//API methods

const getRoomById = async (req, res, next) => {
  const roomId = req.params.roomId;
  let room;
  try {
    room = await Room.findById(roomId);
  } catch (err) {
    return next(err);
  }
  res.json({ room });
};

const getAllRooms = async (req, res, next) => {
  let roomList;
  try {
    roomList = await Room.find({}); // getting an array of all rooms
  } catch (error) {
    console.log(error);
  }
  res.json({ roomList }); //sending the array as a response
};

const addRoom = async (req, res, next) => {
  const newRoom = new Room({
    name: "room1",
    maxPop: 10,
    pop: [],
    messages: [],
    currentSong: "drake",
  });

  try {
    await newRoom.save();
  } catch (err) {
    return next(err);
  }
};

const sendMessage = (req, res, next) => {
  const roomId = req.params.roomId;
  console.log(`a message has send in room ${roomId}`);
};

module.exports = { getRoomById, sendMessage, getAllRooms };
