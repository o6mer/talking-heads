const mongoose = require("mongoose");
const { Room } = require("../models/roomModel.js");
const { User } = require("../models/userModel.js");

const { ServerResponse } = require("../serverResponse");

const getUserNoPass = async (userId) => {
  const user = await User.findOne({ _id: userId }, { password: 0 }).populate(
    "rooms"
  );
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

const deleteRoomDB = async (userId, roomId) => {
  let roomToDelete;
  try {
    //populate makes userId to user in roomCreator
    roomToDelete = await Room.findById(roomId).populate("roomCreator");
    const user = await User.findById(userId);

    if (roomToDelete.roomCreator._id.toString() !== userId.toString()) {
      return new ServerResponse(
        "only the room creator can delete his room",
        400,
        "ERROR"
      );
    }
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await roomToDelete.remove({ session: sess });
    roomToDelete.roomCreator.rooms.pull(roomToDelete);
    await roomToDelete.roomCreator.save({ session: sess });
    await sess.commitTransaction();

    return new ServerResponse("Room deleted successfully!", 200, "OK");
  } catch (error) {
    console.log(error);
  }
};

const addRoomDB = async (userId, name, maxPop, image) => {
  const roomCreator = mongoose.Types.ObjectId(userId);
  //Validation~
  if (
    !/[a-zA-Z]/.test(name) ||
    maxPop <= 0 ||
    !/^[1-9]\d*(\.\d+)?$/.test(maxPop)
  ) {
    return new ServerResponse("invalid room attributes", 400, "ERROR");
  }
  //~~~~~~~~~

  let user;
  //trying to search user from db
  try {
    user = await User.findById(roomCreator);
  } catch (error) {
    console.log(error);
  }

  if (!user) {
    return new ServerResponse("creating user not found", 404, "ERROR");
  }
  let newRoom = new Room({
    name,
    maxPop,
    image,
    pop: [],
    messages: [],
    roomCreator,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newRoom.save({ session: sess });
    user.rooms.push(newRoom);
    await user.save({ session: sess });
    await sess.commitTransaction();
    let newRoomFromDB = await Room.findOne({ name: name });
    newRoomFromDB = newRoomFromDB.toObject();
    return new ServerResponse("room created successfully", 200, newRoomFromDB);
  } catch (err) {
    console.log(err);
  }
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
  const userIdAsObjectId = mongoose.Types.ObjectId(userId);
  try {
    let currentRoom = await Room.findOne({ pop: userIdAsObjectId });
    let selectedRoom;

    if (mongoose.Types.ObjectId.isValid(roomId)) {
      selectedRoom = await Room.findById(roomId).populate("roomCreator");

      if (selectedRoom) {
        const { pop, maxPop } = selectedRoom;
        if (pop.length === maxPop) {
          return {
            responseMsg: new ServerResponse(
              "selected room is full",
              400,
              "ERROR"
            ),
          };
        }
      }
    }

    await Room.populate(selectedRoom, { path: "roomCreator.rooms" });

    if (currentRoom) {
      //remove the user from his current room
      const filteredPop = currentRoom.pop.filter((id) => {
        return id.toString() !== userIdAsObjectId.toString();
      });

      currentRoom.pop = filteredPop;

      await currentRoom.save();
    }

    //error handling in case selected/previous room not found
    if (currentRoom && !selectedRoom)
      return {
        currentRoom,
        responseMsg: new ServerResponse(
          "selected room not found",
          404,
          "ERROR"
        ),
      };
    if (!selectedRoom)
      return {
        responseMsg: new ServerResponse(
          "selected room not found",
          404,
          "ERROR"
        ),
      };

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
    await Room.populate(updatedUsersInfoRoom, { path: "usersInfo.rooms" });

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

    return {
      newRoom,
      currentRoom,
      responseMsg: new ServerResponse("room changed successfully", 200, "OK"),
    };
  } catch (err) {
    console.log("errrr", err);
    return {
      responseMsg: new ServerResponse("an error has occured", 400, "ERROR"),
    };
  }
};

module.exports = {
  getRoomByIdDB,
  sendMessageDB,
  joinRoomDB,
  deleteMessageDB,
  leaveRoomDB,
  deleteRoomDB,
  addRoomDB,
};
