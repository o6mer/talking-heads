const { Room } = require("../models/roomModel.js");
const bodyParser = require("body-parser");
const uniqid = require("uniqid");

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

const sendMessage = async (req, res, next) => {
  const roomId = req.params.roomId;
  const { msgWriter, msgContent, msgTime } = req.body;
  msgId = uniqid();
  const newMsg = {
    msgWriter,
    msgContent,
    msgTime,
    msgId,
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
const deleteMessage = async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const { msgId } = req.body;
    console.log(req.body);
    await Room.findByIdAndUpdate(roomId, {
      $pull: { messages: { msgId: msgId } },
    }); //pulling the message with the required msgId out of the msgArray
  } catch (error) {
    console.log(error);
  }
};

const joinRoom = async (req, res, next) => {
  const roomId = req.params.roomId;
  const { userId } = req.body;
  try {
    const currentRoom = await Room.find({ pop: userId });

    console.log(currentRoom);
    let currentRoomId;
    if (currentRoom.length !== 0) currentRoomId = currentRoom[0]._id.toString();

    if (currentRoomId === roomId) {
      res.status(400).json({ message: "already joined the room" });
      console.log(
        currentRoomId + " already joined the room | roomdId: " + roomId
      );
      return;
    }

    if (currentRoom.length !== 0) {
      await Room.findByIdAndUpdate(currentRoomId, {
        $pull: { pop: userId },
      });
    }

    await Room.findByIdAndUpdate(roomId, {
      $push: { pop: userId },
    });

    const updatatedRoom = await Room.findById(roomId);
    res.status(200).json({
      message: `${userId} joined the room: ${roomId}`,
      pop: updatatedRoom.pop,
    });
    return "joined room";
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
    return new Error(err);
  }
};

module.exports = {
  getRoomById,
  sendMessage,
  getAllRooms,
  deleteMessages,
  deleteMessage,
  joinRoom,
  addRoom,
};
