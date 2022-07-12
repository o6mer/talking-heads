const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const usersRoutes = require("./Routes/usersRoutes");
const spotifyRoutes = require("./Routes/spotifyRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", usersRoutes);

app.use("/spotify", spotifyRoutes);

app.listen(3001);
