const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const usersRoutes = require("./Routes/usersRoutes");
const spotifyRoutes = require("./Routes/spotifyRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", usersRoutes);

app.use("/spotify", spotifyRoutes);

const router = express.Router();
const {
  getRoomById,
  sendMessage,
  getAllRooms,
} = require("./controller/roomsController");

router.get("/:roomId", getRoomById); // get room details
router.get("/", getAllRooms); // get all the rooms as an array
router.post("/:roomId", sendMessage); // send a message

app.use("/api/room", router); //mounting the router on the app

mongoose
  .connect(
    "mongodb+srv://yanaysella:YanaySella1234@name.xo8bocb.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(
    app.listen(3001, () => {
      console.log("listening on port 3001!!");
    })
  )
  .catch((err) => {
    console.log(err);
  });
