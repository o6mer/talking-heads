import React, { useContext } from "react";
import RoomItem from "./RoomItem";
import { rooms } from "../../ChatRoom/ChatRoom";
import { useState } from "react";
import { UserContext } from "../../../../contexts/UserContextProvider";

const RoomList = (props) => {
  const { roomList, joinRoom } = props;

  const { darkMode } = useContext(UserContext);

  return (
    <section
      className={`overflow-auto overflow-x-hidden h-full ${
        darkMode ? "scrollbar-dark" : "scrollbar"
      }`}
    >
      {roomList.map((element) => (
        <RoomItem room={element} joinRoom={joinRoom} />
      ))}
    </section>
  );
};

export default RoomList;
