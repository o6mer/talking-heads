//route: /api/room/...

const express = require("express");
const {
  getRoomById,
  sendMessage,
  getAllRooms,
  deleteMessages,
  joinRoom,
} = require("../controllers/roomsController");

const router = express.Router();

router.get("/:roomId", getRoomById); // get room details
router.get("/", getAllRooms); // get all the rooms as an array
router.get("/deletMessages/:roomId", deleteMessages);
router.post("/:roomId", sendMessage); // send a message
router.post("/joinRoom/:roomId", joinRoom);

module.exports = router;
