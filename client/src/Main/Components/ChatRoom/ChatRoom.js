import React, { useEffect, useState } from "react";
import SpotifyAuth from "../SpotifyApi/SpotifyAuth";
import Chat from "./Components/Chat";
import Keyboard from "./Components/Keyboard";
import ProfilesSideBar from "./Components/ProfilesSideBar";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";
import Dashboard from "../SpotifyApi/Dashboard";

const code = new URLSearchParams(window.location.search).get("code");
const ChatRoom = () => {
  return (
    <main className="flex w-full">
      <section className="w-full flex flex-col ">
        {code ? <Dashboard code={code} /> : <SpotifyAuth />}
        <Chat />
        <Keyboard />
      </section>
      <ProfilesSideBar />
    </main>
  );
};

export default ChatRoom;
