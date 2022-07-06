import React from "react";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=d679667fbb3e4d9e92688887dd7e6db3&response_type=code&redirect_uri=http://localhost:3000/main&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function SpotifyAuth() {
  return (
    <div className="flex justify-center align-center">
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
    </div>
  );
}
