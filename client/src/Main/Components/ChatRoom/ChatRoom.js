import React from "react";
import Chat from "./Components/Chat";
import ProfilesSideBar from "./Components/ProfilesSideBar";

const ChatRoom = ({ selectedRoom }) => {
  const { _id, messages, usersInfo } = selectedRoom;

  return (
    <>
      {_id ? (
        <section className="w-full h-full flex">
          <Chat msgsArr={messages} roomId={_id} selectedRoom={selectedRoom} key={`chat:${_id}`} />
          <ProfilesSideBar pop={usersInfo} key={`profileSideBar:${_id}`} selectedRoom={selectedRoom} />
        </section>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default ChatRoom;
