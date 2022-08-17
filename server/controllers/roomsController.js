const { Room } = require("../models/roomModel.js");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

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
  const { roomName, maxPop } = req.body; // getting the room details from the request body
  const newRoom = new Room({
    name: roomName,
    maxPop,
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

const sendMessage = async (req, res, next) => {
  const roomId = req.params.roomId;
  console.log(req.body);
  const { msgWriter, msgContent, msgTime } = req.body;
  console.log(`a message has send in room ${roomId}`);
  const newMsg = {
    msgWriter,
    msgContent,
    msgTime,
  };
  try {
    await Room.findByIdAndUpdate(roomId, { $push: { messages: newMsg } });
  } catch (err) {
    console.log(err);
  }
  res.json({ ...newMsg });
};

const deleteMessages = async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    await Room.findByIdAndUpdate(roomId, { $set: { messages: [] } });
    res.status(200).json({ message: "messages deleted" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getRoomById,
  sendMessage,
  getAllRooms,
  deleteMessages,
  addRoom,
};
