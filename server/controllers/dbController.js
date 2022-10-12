const { Room } = require("../models/roomModel.js");

const getRoomByIdDB = async (roomId) => {
  let room;
  try {
    room = await Room.findById(roomId);
  } catch (err) {
    return new Error(err);
  }
  return room;
};

const sendMessageDB = async (msg, roomId) => {
  console.log("####");
  console.log(msg, roomId);
  try {
    console.log(msg);
    await Room.findByIdAndUpdate(roomId, {
      $push: { messages: msg },
    });
  } catch (err) {
    console.log(err + " sending msg");
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

module.exports = { getRoomByIdDB, sendMessageDB, joinRoomDB };
