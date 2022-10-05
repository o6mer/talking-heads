const { sendMessageDB, joinRoomDB } = require("./roomsController");

const onSocketConection = (socket, io) => {
  socket.on("sendMsg", onSendMessage);
  socket.on("joinRoom", onJoinRoom);

  async function onSendMessage(msg, room) {
    await sendMessageDB(msg, room);

    if (room === "") socket.broadcast.emit("receiveMsg", msg);
    else {
      socket.to(room).emit("receiveMsg", msg);
    }
  }

  const rooms = [];
  async function onJoinRoom(roomId, userId, callback) {
    rooms.forEach((room) => {
      socket.to(room).emit("userLeftRoom", userId);
      socket.leave(room);
      rooms.pop();
    });

    try {
      // await joinRoom(room, userId);
      if (!roomId || !userId) return;

      const room = await joinRoomDB(roomId, userId);
      socket.join(roomId);

      socket.to(roomId).emit("userJoinedRoom", userId, room);
      callback(room);
      rooms.push(roomId);
      console.log("rooms: " + rooms);
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = { onSocketConection };