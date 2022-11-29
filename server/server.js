const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/usersRoutes");
const spotifyRoutes = require("./routes/spotifyRoutes");
const roomRoutes = require("./routes/roomRoutes");
const { onSocketConection } = require("./controllers/socketController");
require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3001;

let app = express(),
  server = require("http").createServer(app),
  io = require("socket.io")({
    cors: {
      origin: [process.env.FRONTEND_URL],
    },
  }).listen(server);

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
app.use(bodyParser.json());

io.on("connection", (socket) => onSocketConection(socket, io));

const routerLand = express.Router();
routerLand.get("/", (req, res, next) => {});

app.use("/api/user", usersRoutes);
app.use("/api/spotify", spotifyRoutes);
app.use("/api/room", roomRoutes);
app.use("/", routerLand);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    server.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
