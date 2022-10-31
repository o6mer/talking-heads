const { Room } = require("../models/roomModel.js");
const mongoose = require("mongoose");
const { User } = require("../models/userModel.js");

const getUserNoPass = async (userId) => {
  const user = await User.findOne({ _id: userId }, { password: 0 });
  return user;
};

//is this useless???
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
  msg.msgWriter = mongoose.Types.ObjectId(msg.msgWriter);
  try {
    await Room.findByIdAndUpdate(roomId, {
      $push: { messages: msg },
    });
  } catch (err) {
    console.log(err + " sending msg");
  }
  //returning the message with user info to the socket controller
  msg.msgWriter = await getUserNoPass(msg.msgWriter);
  return msg;
};

//deleting the message from the room inside the db
const deleteMessageDB = async (roomId, msgId) => {
  try {
    await Room.findByIdAndUpdate(roomId, {
      $pull: { messages: { msgId: msgId } },
    }); //pulling the message with the required msgId out of the msgArray
  } catch (error) {
    console.log(error);
  }
};

const leaveRoomDB = async (userId, roomId) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(roomId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    )
      return;
    const userIdAsObjectId = mongoose.Types.ObjectId(userId);

    const room = await Room.findById(roomId);

    if (!room) return;

    room.pop = room.pop.filter(
      (id) => id.toString() !== userIdAsObjectId.toString()
    );
    await room.save();
    return room;
  } catch (err) {
    console.log("leave room", err);
  }
};

const joinRoomDB = async (userId, roomId) => {
  //turns string id to ObjectId

  const userIdAsObjectId = mongoose.Types.ObjectId(userId);
  try {
    let currentRoom = await Room.findOne({ pop: userIdAsObjectId });

    if (currentRoom) {
      //remove the user from his current room
      const filteredPop = currentRoom.pop.filter((id) => {
        return id.toString() !== userIdAsObjectId.toString();
      });

      currentRoom.pop = filteredPop;

      await currentRoom.save();
    }
    if (!mongoose.Types.ObjectId.isValid(roomId)) return;

    const selectedRoom = await Room.findById(roomId);
    if (!selectedRoom && currentRoom) return { currentRoom };
    if (!selectedRoom) return;
    //add user to his selected room and updating db
    selectedRoom.pop.push(userIdAsObjectId);
    await selectedRoom.save();

    //get the user information based on the user id and returns an array of objects
    const updatedUsersInfoRoom = await Room.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(roomId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "pop",
          foreignField: "_id",
          as: "usersInfo",
        },
      },
    ]);

    //converts all msgWriter to user object corresponding to the userId
    await Promise.all(
      selectedRoom.messages.map(async (message) => {
        const userId = message.msgWriter;

        const user = await getUserNoPass(userId);

        message.msgWriter = user;
      })
    );

    //combine the room info with the new user infro array
    const newRoom = {
      ...selectedRoom.toObject(),
      usersInfo: updatedUsersInfoRoom[0].usersInfo,
    };

    return { newRoom, currentRoom };
  } catch (err) {
    console.log("errrr", err);
    // return new Error(err);
  }
};

module.exports = { getRoomByIdDB, sendMessageDB, joinRoomDB, deleteMessageDB };
