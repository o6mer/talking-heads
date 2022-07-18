const { Room } = require("../dataBase");

const getRoomById = async (req, res, next) => {
  const roomId = req.params.roomId;
  console.log(roomId);
  let room;
  try {
    room = await Room.findById(roomId);
  } catch (err) {
    return next(err);
  }
  res.json({ room });
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

module.exports = { getRoomById, sendMessage, addRoom };
