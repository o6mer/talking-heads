import React, { useEffect, useState } from "react";
import SpotifyAuth from "../SpotifyApi/SpotifyAuth";
import Chat from "./Components/Chat";
import ProfilesSideBar from "./Components/ProfilesSideBar";
import Dashboard from "../SpotifyApi/Dashboard";

// people and messaegs for the room
import msgsArr from "./chatRoomMsgs";
import peopleArr from "./chatRoomPeople";

const code = new URLSearchParams(window.location.search).get("code");

//every room will have these properties:
class Room {
  constructor(id, name, msgs, pop, maxPop) {
    this.id = id;
    this.name = name;
    this.msgs = msgs; // the messages array
    this.pop = pop; // the people's array
    this.maxPop = maxPop;
  }
}

//making chat rooms
const room1 = new Room(1, "pop", msgsArr[0], peopleArr[0], 10);
const room2 = new Room(2, "rock", msgsArr[1], peopleArr[1], 10);
const room3 = new Room(3, "rap", msgsArr[2], peopleArr[2], 10);
const room4 = new Room(4, "shit", msgsArr[3], peopleArr[3], 10);
const room5 = new Room(5, "bit", msgsArr[4], peopleArr[4], 10);

//chat rooms array
const rooms = [room1, room2, room3, room4, room5];

const ChatRoom = (props) => {
  let { roomId } = props; //getting the room id prop

  const theRoom = rooms.filter((e) => {
    return `${e.id}` === roomId;
  })[0];

  console.log("the room is:");
  console.log(theRoom);
  console.log(theRoom.id);

  return (
    <main className="flex w-full">
      <section className="w-full flex flex-col ">
        {code ? <Dashboard code={code} /> : <SpotifyAuth />}
        <Chat chatArr={theRoom.msgs} roomId={theRoom.id} key={theRoom.id} />
      </section>
      <ProfilesSideBar people={theRoom.pop} key={theRoom.id} />
    </main>
  );
};

export default ChatRoom;
export { rooms };
