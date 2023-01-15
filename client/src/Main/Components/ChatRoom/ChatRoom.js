import React, { useContext, useEffect, useState } from "react";
import Chat from "./Components/Chat";
import ProfilesSideBar from "./Components/ProfilesSideBar";
import { useNavigate } from "react-router-dom";

import SideBar from "../SideBar/SideBar";
import { UserContext } from "../../../contexts/UserContextProvider";

const ChatRoom = ({ selectedRoom }) => {
  const { _id, messages, usersInfo } = selectedRoom;

  const { socket } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("roomDeleted", (roomId) => {
      if (selectedRoom._id.toString() === roomId?.toString()) {
        navigate("/main");
      }
    });
  }, []);

  return (
    <section className="w-full flex grow">
      <Chat
        msgsArr={messages}
        roomId={_id}
        selectedRoom={selectedRoom}
        key={`chat:${_id}`}
      />
      <ProfilesSideBar
        key={`profileSideBar:${_id}`}
        selectedRoom={selectedRoom}
      />
    </section>
  );
};

export default ChatRoom;
