import React, { useContext, useEffect } from "react";
import Chat from "./Components/Chat";
import ProfilesSideBar from "./Components/ProfilesSideBar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContextProvider";

const ChatRoom = ({ selectedRoom }) => {
  const { _id, messages } = selectedRoom;

  const { socket } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("roomDeleted", (roomId) => {
      if (selectedRoom._id.toString() === roomId?.toString()) {
        navigate("/main");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
