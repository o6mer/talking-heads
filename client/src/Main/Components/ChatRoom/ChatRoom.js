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
const room1 = new Room(
  "62d551125f5f5e39e60a3781",
  "pop",
  msgsArr[0],
  peopleArr[0],
  10
);
const room2 = new Room(
  "62d56c184a8048b8f55125b0",
  "rock",
  msgsArr[1],
  peopleArr[1],
  10
);
const room3 = new Room(3, "rap", msgsArr[2], peopleArr[2], 10);
const room4 = new Room(4, "shit", msgsArr[3], peopleArr[3], 10);
const room5 = new Room(5, "bit", msgsArr[4], peopleArr[4], 10);

//chat rooms array
const rooms = [room1, room2, room3, room4, room5];

const ChatRoom = (props) => {
  let { roomId } = props; //getting the room id prop

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
      {chatRoom._id && (
        <React.Fragment>
          <section className="w-full flex flex-col ">
            {code ? <Dashboard code={code} /> : <SpotifyAuth />}
            <Chat chatArr={messages} roomId={_id} key={_id} />
          </section>
          <ProfilesSideBar people={pop} key={_id} />
        </React.Fragment>
      )}
    </main>
  );
};

export default ChatRoom;
export { rooms };
