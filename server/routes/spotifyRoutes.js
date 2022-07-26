const express = require("express");
const spotifyController = require("../controllers/spotifyController");

const router = express.Router();

router.post("/refresh", spotifyController.refresh);

router.post("/login", spotifyController.login);

module.exports = router;
