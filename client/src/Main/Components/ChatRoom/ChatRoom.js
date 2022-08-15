import React, { useEffect, useState } from "react";
import Chat from "./Components/Chat";
import ProfilesSideBar from "./Components/ProfilesSideBar";

const ChatRoom = (props) => {
  let { roomId, roomList } = props; //might not need the roomList

  const [chatRoom, setChatRoom] = useState({});
  const { _id, messages, pop } = chatRoom;

  useEffect(() => {
    if (!roomId) return;
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/room/${roomId}`
        );
        const resData = await response.json();
        console.log(resData);
        setChatRoom(resData.room);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequest();
  }, [roomId]); // take action when the roomId changes

  return (
    <>
      {_id ? (
        <section className="w-full flex">
          <Chat chatArr={messages} roomId={_id} />
          <ProfilesSideBar pop={pop} />
        </section>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default ChatRoom;
