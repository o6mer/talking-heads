import React from "react";
import RoomItem from "./RoomItem";
import { rooms } from "../../ChatRoom/ChatRoom";

const RoomList = (props) => {
  const { roomList, joinRoom } = props;

  return (
    <section className="overflow-scroll overflow-x-hidden">
      {roomList.map((element) => (
        <RoomItem room={element} joinRoom={joinRoom} />
      ))}
    </section>
  );
};

export default RoomList;
