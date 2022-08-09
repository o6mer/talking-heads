const port = 3001;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/usersRoutes");
const spotifyRoutes = require("./routes/spotifyRoutes");
const roomRoutes = require("./routes/roomRoutes");
const io = require("socket.io")(8080, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

let server;

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

io.on("connection", (socket) => {
  socket.on("getMsg", (msg, room) => {
    if (room === "") socket.broadcast.emit("receiveMsg", msg);
    else socket.to(room).emit("receiveMsg", msg);

    console.log(msg);
  });
  socket.on("join-room", (room) => {
    socket.join(room);
  });
});

const routerLand = express.Router();
routerLand.get("/", (req, res, next) => {
  console.log("LMAO");
});

app.use("/api/user", usersRoutes);
app.use("/api/spotify", spotifyRoutes);
app.use("/api/room", roomRoutes);
app.use("/", routerLand);

mongoose
  .connect(
    "mongodb+srv://yanaysella:YanaySella1234@name.xo8bocb.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    server = app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
