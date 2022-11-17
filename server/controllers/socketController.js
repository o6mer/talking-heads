const {
  sendMessageDB,
  joinRoomDB,
  deleteMessageDB,
  leaveRoomDB,
  deleteRoomDB,
  addRoomDB,
} = require("./dbController");
const uniqid = require("uniqid");
const fs = require("fs");

const onSocketConection = (socket, io) => {
  socket.on("sendMsg", onSendMessage);
  socket.on("joinRoom", onJoinRoom);
  socket.on("userDisconnected", onUserDisconnected);
  socket.on("delMsg", onDeleteMessage);
  socket.on("delRoom", onDeleteRoom);
  socket.on("addRoom", onAddRoom);

  async function onUserDisconnected(userId, roomId) {
    socket.to(roomId).emit("userLeftRoom", userId);
    const updatedRoom = await leaveRoomDB(userId, roomId);
    io.emit("userChangedRoom", null, updatedRoom);
  }

  async function onSendMessage(msg, roomId, callback) {
    msg.msgId = uniqid();

    msg = await sendMessageDB(msg, roomId);

    if (roomId === "") socket.emit("receiveMsg", msg);
    else {
      io.emit("receiveMsg", msg, roomId);
    }
    // callback(msg);
  }

  async function onDeleteMessage(roomId, msgId, userId, msgWriterId, callback) {
    if (userId.toString() === msgWriterId.toString()) {
      deleteMessageDB(roomId, msgId); // deleting the message on the db
      socket.broadcast.emit("removeMsg", msgId);
      callback("message deleted!");
    } else callback("message deletion denied!");
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

      const dbResponse = await joinRoomDB(userId, roomId);

      const newRoom = dbResponse?.newRoom;

      const currentRoom = dbResponse?.currentRoom;
      const { responseMsg } = dbResponse;
      if (newRoom) {
        socket.join(roomId);
        socket.to(roomId).emit("userJoinedRoom", userId, newRoom);
      }

      io.emit("userChangedRoom", newRoom, currentRoom);

      callback(newRoom, responseMsg);
      rooms.push(roomId);
    } catch (err) {
      console.log(err);
    }
  }

  async function onAddRoom(userId, name, maxPop, file, callback) {
    console.log(file);
    fs.writeFile("uploads/roomImages.js", file, (err) => {
      console.log(err);
    });
    const dbResponse = await addRoomDB(userId, name, maxPop);
    if (dbResponse.statusCode === 400 || dbResponse.statusCode === 404) {
      callback(dbResponse);
      return;
    }
    const newRoom = dbResponse.data;
    callback(file);
    io.emit("roomAdded", newRoom);
  }

  async function onDeleteRoom(userId, roomId, callback) {
    const dbResponse = await deleteRoomDB(userId, roomId);
    if (dbResponse.statusCode === 400) {
      callback(dbResponse);
      return;
    }
    io.emit("roomDeleted", roomId);
    callback(dbResponse);
  }
};

module.exports = { onSocketConection };
