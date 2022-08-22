//route: /api/room/...

const express = require("express");
const {
  getRoomById,
  sendMessage,
  getAllRooms,
  deleteMessages,
  joinRoom,
  addRoom,
} = require("../controllers/roomsController");

const router = express.Router();

//get
router.get("/", getAllRooms); // get all the rooms as an array
router.get("/:roomId", getRoomById); // get room details
router.get("/deletMessages/:roomId", deleteMessages);

//post
router.post("/joinRoom/:roomId", joinRoom);
router.post("/", addRoom); // add a new room
router.post("/:roomId", sendMessage); // send a message in a specific room id

module.exports = router;
