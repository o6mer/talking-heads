import React, { useEffect, useState } from "react";
import SpotifyAuth from "../SpotifyApi/SpotifyAuth";
import Chat from "./Components/Chat";
import Keyboard from "./Components/Keyboard";
import ProfilesSideBar from "./Components/ProfilesSideBar";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";
import Dashboard from "../SpotifyApi/Dashboard";
import msgsArr from "./chatRoomMsgs";
import peopleArr from "./chatRoomPeople";

const code = new URLSearchParams(window.location.search).get("code");

class Room {
  constructor(id, msgs, pop) {
    this.id = id;
    this.msgs = msgs; // the messages array
    this.pop = pop; // the people's array
  }
}

const ChatRoom = (props) => {
  let { roomId } = props; //getting the room id prop

  //getting the speceific messages array with id filter
  const chatArr = msgsArr.filter((element) => {
    return `${element.id}` === roomId;
  });

  const popArr = peopleArr.filter((element) => {
    return `${element.roomId}` === roomId;
  });

  const thisRoom = new Room(roomId, chatArr, popArr); // might be useless

  return (
    <main className="flex w-full">
      <section className="w-full flex flex-col ">
        {code ? <Dashboard code={code} /> : <SpotifyAuth />}
        <Chat chatArr={chatArr[0].arr} key={chatArr[0].id} />
      </section>
      <ProfilesSideBar people={popArr[0].arr} key={popArr[0].roomId} />
    </main>
  );
};

export default ChatRoom;
