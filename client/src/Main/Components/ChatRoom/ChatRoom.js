import React, { useEffect, useState } from "react";
import SpotifyAuth from "../SpotifyApi/SpotifyAuth";
import Chat from "./Components/Chat";
import Keyboard from "./Components/Keyboard";
import ProfilesSideBar from "./Components/ProfilesSideBar";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";
import Dashboard from "../SpotifyApi/Dashboard";
import msgsArr from "./chatRoomMsgs";

const code = new URLSearchParams(window.location.search).get("code");

// const msgs1 = {
//   id: 1,
//   arr: [
//     { msgWriter: "p1", msgContent: "test massage 11", msgTime: "00:00" },
//     { msgWriter: "p2", msgContent: "test massage 12", msgTime: "00:00" },
//     { msgWriter: "p3", msgContent: "test massage 13", msgTime: "00:00" },
//     { msgWriter: "p4", msgContent: "test massage 14", msgTime: "00:00" },
//   ],
// };
// const msgs2 = {
//   id: 2,
//   arr: [
//     { msgWriter: "p1", msgContent: "test massage 21", msgTime: "00:00" },
//     { msgWriter: "p2", msgContent: "test massage 22", msgTime: "00:00" },
//     { msgWriter: "p3", msgContent: "test massage 23", msgTime: "00:00" },
//     { msgWriter: "p4", msgContent: "test massage 24", msgTime: "00:00" },
//   ],
// };
// const msgs3 = {
//   id: 3,
//   arr: [
//     { msgWriter: "p1", msgContent: "test massage 31", msgTime: "00:00" },
//     { msgWriter: "p2", msgContent: "test massage 32", msgTime: "00:00" },
//     { msgWriter: "p3", msgContent: "test massage 33", msgTime: "00:00" },
//     { msgWriter: "p4", msgContent: "test massage 34", msgTime: "00:00" },
//   ],
// };
// const msgs4 = {
//   id: 3,
//   arr: [
//     { msgWriter: "p1", msgContent: "test massage 31", msgTime: "00:00" },
//     { msgWriter: "p2", msgContent: "test massage 32", msgTime: "00:00" },
//     { msgWriter: "p3", msgContent: "test massage 33", msgTime: "00:00" },
//     { msgWriter: "p4", msgContent: "test massage 34", msgTime: "00:00" },
//   ],
// };
// const msgs5 = {
//   id: 3,
//   arr: [
//     { msgWriter: "p1", msgContent: "test massage 31", msgTime: "00:00" },
//     { msgWriter: "p2", msgContent: "test massage 32", msgTime: "00:00" },
//     { msgWriter: "p3", msgContent: "test massage 33", msgTime: "00:00" },
//     { msgWriter: "p4", msgContent: "test massage 34", msgTime: "00:00" },
//   ],
// };
// let msgsArr = [msgs1, msgs2, msgs3, msgs4, msgs5];

const ChatRoom = (props) => {
  let { roomId } = props; //destructure
  const chatArr = msgsArr.filter((element, index) => {
    return `${element.id}` === roomId;
  });
  console.log("this is the array");
  console.log(chatArr);
  return (
    <main className="flex w-full">
      <section className="w-full flex flex-col ">
        {code ? <Dashboard code={code} /> : <SpotifyAuth />}
        <Chat chatArr={chatArr[0].arr} key={chatArr[0].id} />
      </section>
      <ProfilesSideBar />
    </main>
  );
};

export default ChatRoom;
