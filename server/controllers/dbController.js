const { Room } = require("../models/roomModel.js");
const mongoose = require("mongoose");
const { User } = require("../models/userModel.js");

//filters password from the user
const passFilter = ({ _id, userName, email, profilePictureUrl }) => ({
  _id,
  userName,
  email,
  profilePictureUrl,
});

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
  msg.msgWriter = passFilter(await User.findById(msg.msgWriter));
  return msg;
};

const joinRoomDB = async (roomId, userId) => {
  //turns string id to ObjectId
  const userIdAsObjectId = mongoose.Types.ObjectId(userId);

  try {
    let currentRoom = await Room.findOne({ pop: userIdAsObjectId });

    if (currentRoom) {
      //check if user already in a room

      // if (currentRoom._id.toString() === roomId) {
      //   //check if the room he is trying to join is his current room
      //   console.log("already joined the room | roomdId: " + roomId);
      //   return new Error("already joined the room");
      // }

      //remove the user from his current room
      const filteredPop = currentRoom.pop.filter((id) => {
        return id.toString() !== userIdAsObjectId.toString();
      });

      currentRoom.pop = filteredPop;

      await currentRoom.save();
    }

    const selectedRoom = await Room.findById(roomId);

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

        const user = await User.findById(userId);

        message.msgWriter = passFilter(user);
      })
    );

    //combine the room info with the new user infro array
    const newRoom = {
      ...selectedRoom.toObject(),
      usersInfo: updatedUsersInfoRoom[0].usersInfo,
    };

    return newRoom;
  } catch (err) {
    return new Error(err);
  }
};

module.exports = { getRoomByIdDB, sendMessageDB, joinRoomDB };
