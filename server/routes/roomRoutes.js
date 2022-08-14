//route: /api/room/...

const express = require("express");
const {
  getRoomById,
  sendMessage,
  getAllRooms,
  deleteMessages,
} = require("../controllers/roomsController");

const router = express.Router();

router.get("/:roomId", getRoomById); // get room details
router.get("/", getAllRooms); // get all the rooms as an array
router.get("/deletMessages/:roomId", deleteMessages);
router.post("/:roomId", sendMessage); // send a message

module.exports = router;
