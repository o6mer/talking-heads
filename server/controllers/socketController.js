const { sendMessageDB, joinRoomDB } = require("./dbController");
const uniqid = require("uniqid");

const onSocketConection = (socket, io) => {
  socket.on("sendMsg", onSendMessage);
  socket.on("joinRoom", onJoinRoom);
  socket.on("userDisconnected", onUserDisconnected);

  function onUserDisconnected(userId) {
    console.log("user disssss");
    socket.emit("userLeftRoom", userId);
  }

  async function onSendMessage(msg, room, callback) {
    msg.msgId = uniqid();
    await sendMessageDB(msg, room);

    if (room === "") socket.broadcast.emit("receiveMsg", msg);
    else {
      socket.to(room).emit("receiveMsg", msg);
    }
    callback(msg);
  }

  const rooms = [];
  async function onJoinRoom(roomId, userId, callback) {
    rooms.forEach((room) => {
      socket.to(room).emit("userLeftRoom", userId);
      socket.leave(room);
      rooms.pop();
    });

    try {
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
