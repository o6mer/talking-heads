const SpotifyWebApi = require("spotify-web-api-node");

const refresh = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/main/1",
    clientId: "d679667fbb3e4d9e92688887dd7e6db3",
    clientSecret: "537dc11b712848d9af1ea90c27794e3f",
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
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/main/1",
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
};

exports.refresh = refresh;
exports.login = login;
