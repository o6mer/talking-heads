const { Room } = require("../models/roomModel.js");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//API methods

const getRoomByIdDB = async (roomId) => {
  let room;
  try {
    room = await Room.findById(roomId);
  } catch (err) {
    return new Error(err);
  }
  return room;
};

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

const joinRoomDB = async (roomId, userId) => {
  try {
    const currentRoom = await Room.find({ pop: userId });

    if (currentRoom.length !== 0) {
      //check if user already in a room

      const currentRoomId = currentRoom[0]._id.toString();

      if (currentRoomId === roomId) {
        //check if the room he is trying to join is his current room
        console.log(
          currentRoomId + " already joined the room | roomdId: " + roomId
        );
        return new Error("already joined the room");
      }

      await Room.findByIdAndUpdate(currentRoomId, {
        //delete user from his current room
        $pull: { pop: userId },
      });
    }

    await Room.findByIdAndUpdate(roomId, {
      //add user to the new room
      $push: { pop: userId },
    });

    return await Room.findById(roomId);
  } catch (err) {
    return new Error(err);
  }
};

const joinRoom = async (req, res, next) => {
  const roomId = req.params.roomId;
  const { userId } = req.body;

  try {
    const updatedRoom = await joinRoomDB(roomId, userId);
    console.log(updatedRoom.pop);
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
  sendMessage,
  getAllRooms,
  deleteMessages,
  joinRoom,
  addRoom,
  getRoomByIdDB,
};
