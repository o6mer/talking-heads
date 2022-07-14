const getRoomById = (req, res, next) => {
  const roomId = req.params.roomId;
  console.log("server room ID: " + roomId);
};

const sendMessage = (req, res, next) => {
  const roomId = req.params.roomId;
  console.log(`a message has send in room ${roomId}`);
};

module.exports = { getRoomById, sendMessage };
