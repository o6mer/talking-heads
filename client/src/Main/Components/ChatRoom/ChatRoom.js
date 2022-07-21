import React, { useEffect, useState } from "react";
import SpotifyAuth from "../SpotifyApi/SpotifyAuth";
import Chat from "./Components/Chat";
import ProfilesSideBar from "./Components/ProfilesSideBar";
import Dashboard from "../SpotifyApi/Dashboard";

const code = new URLSearchParams(window.location.search).get("code");

const ChatRoom = (props) => {
  let { roomId, roomList } = props; //might not need the roomList

  const [chatRoom, setChatRoom] = useState({});

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/room/${roomId}`
        );
        const resData = await response.json();
        setChatRoom(resData.room);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequest();
  }, [roomId]); // reRenders when the roomId changes

  const { _id, messages, pop } = chatRoom;

  return (
    <main className="flex w-full">
      {_id ? (
        <>
          <section className="w-full flex flex-col ">
            {code ? <Dashboard code={code} /> : <SpotifyAuth />}
            <Chat chatArr={messages} roomId={_id} key={_id} />
          </section>
          <ProfilesSideBar pop={pop} key={_id} />
        </>
      ) : (
        <div>Loading</div>
      )}
    </main>
  );
};

export default ChatRoom;
