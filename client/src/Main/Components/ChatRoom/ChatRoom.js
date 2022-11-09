import React, { useEffect } from "react";
import Chat from "./Components/Chat";
import ProfilesSideBar from "./Components/ProfilesSideBar";
import { socket } from "../../MainPage.js";
import { useNavigate } from "react-router-dom";

const ChatRoom = ({ selectedRoom }) => {
  const { _id, messages, usersInfo } = selectedRoom;

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("roomDeleted", (roomId) => {
      if (selectedRoom._id.toString() === roomId?.toString()) {
        navigate("/main");
      }
    });
  }, []);

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
