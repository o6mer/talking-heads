import React from "react";
import RoomItem from "./RoomItem";
import { rooms } from "../../ChatRoom/ChatRoom";

const RoomList = () => {
  const DUMMY_ROOMS = rooms;

  return (
    <section className="overflow-scroll overflow-x-hidden">
      {DUMMY_ROOMS.map((element) => (
        <RoomItem room={element} />
      ))}
    </section>
  );
};

export default RoomList;
