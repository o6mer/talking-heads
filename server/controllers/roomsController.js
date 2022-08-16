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

const sendMessage = async (req, res, next) => {
  const roomId = req.params.roomId;
  const { msgWriter, msgContent, msgTime } = req.body;
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

const joinRoom = async (req, res, next) => {
  const roomId = req.params.roomId;
  const { userId } = req.body;
  try {
    const currentRoom = await Room.find({ pop: userId });
    const currentRoomId = currentRoom[0]._id.toString();

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
  joinRoom,
};
