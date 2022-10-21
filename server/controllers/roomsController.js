const { Room } = require("../models/roomModel.js");
const { getRoomByIdDB, sendMessageDB, joinRoomDB } = require("./dbController");
const bodyParser = require("body-parser");

const getRoomById = async (req, res, next) => {
  const roomId = req.params.roomId;
  const room = await getRoomByIdDB(roomId);
  if (!room) res.status(400).json({ message: "room not found" });
  res.status(200).json({ room });
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
  const { name, maxPop } = req.body; // getting the room details from the request body
  const newRoom = new Room({
    name,
    maxPop,
    pop: [],
    messages: [],
    currentSong: "drake",
  });
  try {
    await newRoom.save();
    res.json(newRoom._id);
  } catch (err) {
    return next(err);
  }
};

const deleteRoom = async (req, res, next) => {
  const { _id } = req.body;
  try {
    Room.findByIdAndDelete(_id);
  } catch (error) {
    console.log(error);
  }
};

//delete all messages (useless...)
const deleteMessages = async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    await Room.findByIdAndUpdate(roomId, { $set: { messages: [] } });
    res.status(200).json({ message: "messages deleted" });
  } catch (err) {
    console.log(err);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const { msgId, userInfo, msgWriter } = req.body;
    if (`${msgWriter._id}` === `${userInfo._id}`) {
      await Room.findByIdAndUpdate(roomId, {
        $pull: { messages: { msgId: msgId } },
      }); //pulling the message with the required msgId out of the msgArray
    } else {
      res.status(400).json({
        message: "Bad request, you cant delete other people messages",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const joinRoom = async (req, res, next) => {
  const roomId = req.params.roomId;
  const { userId } = req.body;

  try {
    const updatedRoom = await joinRoomDB(roomId, userId);
    res.status(200).json({
      //find the room the user joined and return its new pop
      message: `${userId} joined the room: ${roomId}`,
      room: updatedRoom,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
    return next();
  }
};

module.exports = {
  getRoomById,
  getAllRooms,
  deleteMessages,
  deleteMessage,
  joinRoom,
  addRoom,
};
