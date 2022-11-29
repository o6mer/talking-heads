const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const refresh = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.SPOTIFY_REDIRECT_URL,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken,
  });
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

const login = async (req, res) => {
  const code = req.body.code;
  if (!code) return res.sendStatus(404);

  // if (code === currentCode)
  //   return res.status(405).json({ accessToken, refreshToken, expiresIn });

  // currentCode = code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.SPOTIFY_REDIRECT_URL,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      accessToken = data.body.access_token;
      refreshToken = data.body.refresh_token;
      // expiresIn = data.body.expires_in;
      res.json({
        accessToken,
        refreshToken,
        expiresIn: new Date(new Date().getTime() + 3600000),
      });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

exports.refresh = refresh;
exports.login = login;
