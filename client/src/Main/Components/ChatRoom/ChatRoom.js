import React, { useEffect, useState } from "react";
import Chat from "./Components/Chat";
import ProfilesSideBar from "./Components/ProfilesSideBar";
import Dashboard from "../SpotifyApi/Dashboard";
import theStone from "./pics/theStone.gif";

const code = new URLSearchParams(window.location.search).get("code");

const ChatRoom = ({ selectedRoom }) => {
  const { _id, messages, pop, usersInfo } = selectedRoom;

  return (
    <>
      {_id ? (
        <section className="w-full flex">
          <Chat msgsArr={messages} roomId={_id} key={_id} />
          <ProfilesSideBar pop={usersInfo} key={_id} />
        </section>
      ) : (
        <div>{/* <img src={theStone} /> */}</div>
      )}
    </>
  );
};

export default ChatRoom;
