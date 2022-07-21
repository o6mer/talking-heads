const express = require("express");
const spotifyController = require("../Controllers/spotifyController");

const router = express.Router();

router.post("/refresh", spotifyController.refresh);

router.post("/login", spotifyController.login);

module.exports = router;
