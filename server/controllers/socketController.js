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
const fsp = require("fs/promises");
const { ServerResponse } = require("../serverResponse");

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

  async function onAddRoom(userId, name, maxPop, image, callback) {
    //only if image comes by
    if (image == null || !image) {
      image = await fsp.readFile("serverMedia/NameLogo.png"); // default image
    } else {
      await fsp.writeFile("uploads/image.jpg", image);
      const stats = fs.statSync("uploads/image.jpg");
      const fileSizeMB = stats.size;
      if (fileSizeMB / (1024 * 1024) >= 1) {
        const res = callback(
          new ServerResponse(
            "file to strong mate, frontend shouldve told you that",
            400,
            "ERROR"
          )
        );
        return;
      }
    }

    const dbResponse = await addRoomDB(userId, name, maxPop, image);
    const { data } = dbResponse;
    callback(dbResponse);

    if (data === "ERROR") {
      return;
    }
    const newRoom = dbResponse.data;
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
