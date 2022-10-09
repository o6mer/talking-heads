const { Room } = require("../models/roomModel.js");
const bodyParser = require("body-parser");
const uniqid = require("uniqid");

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

const joinRoomDB = async (roomId, user, currentRoomId) => {
  const userId = user._id;
  try {
    const currentRoom = await Room.findById(roomId);

    if (currentRoom.length !== 0 && currentRoomId !== "1") {
      //check if user already in a room
      //need to define what a "connection" is. with true/false and change it depends on some stuff lmao

      if (currentRoomId === roomId) {
        //check if the room he is trying to join is his current room
        console.log(
          currentRoomId + " already joined the room | roomdId: " + roomId
        );
        return new Error("already joined the room");
      }

      await Room.findByIdAndUpdate(
        currentRoomId,
        {
          //delete user from his current room by id
          $pull: { pop: { _id: userId } },
        },
        console.log(`user ${user} has left the room :(`)
      );
    }

    await Room.findByIdAndUpdate(
      roomId,
      {
        //add user to the new room
        $push: { pop: user },
      },
      console.log(`user ${user.userName} has logged to room: ${roomId}`)
    );

    return await Room.findById(roomId);
  } catch (err) {
    return new Error(err);
  }
};

const joinRoom = async (req, res, next) => {
  const roomId = req.params.roomId;
  const { user, currentRoomId } = req.body;

  try {
    const updatedRoom = await joinRoomDB(roomId, user, currentRoomId);
    console.log(updatedRoom.pop);
    res.status(200).json({
      //find the room the user joined and return its new pop
      message: `${user.userName} joined the room: ${roomId}`,
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
  deleteMessage,
  joinRoom,
  addRoom,
  getRoomByIdDB,
};
