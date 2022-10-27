//route: /api/room/...

const express = require("express");
const {
  getRoomById,
  // sendMessage,
  getAllRooms,
  deleteMessage,
  joinRoom,
  addRoom,
} = require("../controllers/roomsController");

const router = express.Router();

//get
router.get("/", getAllRooms); // get all the rooms as an array
router.get("/:roomId", getRoomById); // get room details

//post
router.post("/joinRoom/:roomId", joinRoom); // join to a room
router.post("/", addRoom); // add a new room
// router.post("/:roomId", sendMessage); // send a message in a specific room id
router.post("/deleteOneMsg/:roomId", deleteMessage);

module.exports = router;
