const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/usersRoutes");
const spotifyRoutes = require("./routes/spotifyRoutes");
const roomRoutes = require("./routes/roomRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", usersRoutes);
app.use("/api/spotify", spotifyRoutes);
app.use("/api/room", roomRoutes);

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
