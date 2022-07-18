const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/main",
    clientId: "d679667fbb3e4d9e92688887dd7e6db3",
    clientSecret: "537dc11b712848d9af1ea90c27794e3f",
    refreshToken,
  });
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log(data.body);
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/main",
    clientId: "d679667fbb3e4d9e92688887dd7e6db3",
    clientSecret: "537dc11b712848d9af1ea90c27794e3f",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

const router = express.Router();
const {
  getRoomById,
  sendMessage,
  addRoom,
} = require("./controller/roomsController");

router.get("/:roomId", getRoomById); // get room details
router.post("/:roomId", sendMessage); // send a message

app.use("/api/room", router); //mounting the router on the app

mongoose
  .connect(
    "mongodb+srv://yanaysella:Yanay123456@name.xo8bocb.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(
    app.listen(3001, () => {
      console.log("listening on port 3001!!");
    })
  )
  .catch((err) => {
    console.log(err);
  });
