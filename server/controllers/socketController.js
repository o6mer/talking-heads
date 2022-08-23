const { joinRoom, getRoomByIdDB } = require("../controllers/roomsController");
const { Room } = require("../models/roomModel.js");

const onSocketConection = (socket) => {
  const rooms = [];
  socket.on("getMsg", onGetMsg);
  socket.on("joinRoom", onJoinRoom);

  function onGetMsg(msg, room) {
    if (room === "") socket.broadcast.emit("receiveMsg", msg);
    else {
      socket.to(room).emit("receiveMsg", msg);
    }
  }

  async function onJoinRoom(roomId, userId) {
    rooms.forEach((room) => {
      socket.to(room).emit("userLeftRoom", userId);
      socket.leave(room);
      rooms.pop();
    });

    try {
      // await joinRoom(room, userId);
      if (!roomId || !userId) return;
      socket.join(roomId);
      socket.to(roomId).emit("userJoinedRoom", userId);
      rooms.push(roomId);
      console.log("rooms: " + rooms);
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = { onSocketConection };
