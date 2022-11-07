const mongoose = require("mongoose");

const { Room } = require("../models/roomModel.js");
const { User } = require("../models/userModel.js");
const { getRoomByIdDB, sendMessageDB, joinRoomDB } = require("./dbController");
const bodyParser = require("body-parser");

//is this useless?
const getRoomById = async (req, res, next) => {
  const roomId = req.params.roomId;
  const room = await getRoomByIdDB(roomId);
  console.log(room);
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
  const roomCreator = mongoose.Types.ObjectId(req.body.roomCreator);
  if (!/[a-zA-Z]/.test(name) || maxPop <= 0) {
    res.json({ message: "invalid room attributes", statusCode: 400 });
    return;
  }
  let user;
  //trying to search user from db
  try {
    user = User.findById(roomCreator);
  } catch (error) {
    console.log(error);
  }
  if (!user) {
    res.json({ message: "creating user not found", statusCode: 404 });
    return;
  }
  const newRoom = new Room({
    name,
    maxPop,
    pop: [],
    messages: [],
    roomCreator,
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
  deleteMessage,
  joinRoom,
  addRoom,
};
