const { joinRoom } = require("../controllers/roomsController");

const onSocketConection = (socket) => {
  socket.on("getMsg", onGetMsg);
  socket.on("join-room", onJoinRoom);

  function onGetMsg(msg, room) {
    if (room === "") socket.broadcast.emit("receiveMsg", msg);
    else {
      socket.to(room).emit("receiveMsg", msg);
    }
  }

  async function onJoinRoom(room, userId) {
    const rooms = [];
    if (rooms.length !== 0) {
      rooms.forEach(() => {
        socket.leave(rooms.shift());
      });
    }
    try {
      // await joinRoom(room, userId);
      socket.join(room);
      rooms.push(room);
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = { onSocketConection };
