import React from "react";

const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URL;
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=d679667fbb3e4d9e92688887dd7e6db3&response_type=code&redirect_uri=${REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
console.log(REDIRECT_URI);

export default function SpotifyAuth() {
  return (
    <div className="flex justify-center align-center p-2 bg-transparent">
      <a
        className="btn btn-success btn-lg bg-[#1DB954] hover:bg-[#1a9c47] transition-all p-3 font-bold text-black rounded-full"
        href={AUTH_URL}
      >
        Login With Spotify
      </a>
    </div>
  );
}
