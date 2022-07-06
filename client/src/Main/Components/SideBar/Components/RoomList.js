import React from "react";
import RoomItem from "./RoomItem";
import RoomSearch from "../../General/SearchBar";

const RoomList = () => {
  const DUMMY_ROOMS = [
    {
      roomId: 1,
      roomName: "room1",
      roomPop: "0",
      maxRoomPop: "10",
      currentSong: "song1",
    },
    {
      roomId: 2,
      roomName: "room2",
      roomPop: "0",
      maxRoomPop: "10",
      currentSong: "song2",
    },
    {
      roomId: 3,
      roomName: "room3",
      roomPop: "0",
      maxRoomPop: "10",
      currentSong: "song3",
    },
    {
      roomId: 4,
      roomName: "room4",
      roomPop: "0",
      maxRoomPop: "10",
      currentSong: "song4",
    },
    {
      roomId: 5,
      roomName: "room5",
      roomPop: "0",
      maxRoomPop: "10",
      currentSong: "song5",
    },
  ];

  return (
    <section className="overflow-scroll overflow-x-hidden">
      {DUMMY_ROOMS.map((room) => (
        <RoomItem {...room} />
      ))}
    </section>
  );
};

export default RoomList;
