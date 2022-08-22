import React, { useEffect, useState } from "react";
import SpotifyAuth from "../SpotifyApi/SpotifyAuth";
import Chat from "./Components/Chat";
import ProfilesSideBar from "./Components/ProfilesSideBar";
import Dashboard from "../SpotifyApi/Dashboard";
import theStone from "./pics/theStone.gif";

const code = new URLSearchParams(window.location.search).get("code");

const ChatRoom = (props) => {
  let { selectedRoom } = props;

  const { _id, messages, pop } = selectedRoom;

  return (
    <main className="flex w-full h-[90vh]">
      {_id ? (
        <>
          <section className="w-full h-full  flex flex-col">
            {code ? <Dashboard code={code} /> : <SpotifyAuth />}
            <Chat msgsArr={messages} roomId={_id} key={_id} />
          </section>
          <ProfilesSideBar pop={pop} key={_id} />
        </>
      ) : (
        <div>
          <img src={theStone} />
        </div>
      )}
    </main>
  );
};

export default ChatRoom;
