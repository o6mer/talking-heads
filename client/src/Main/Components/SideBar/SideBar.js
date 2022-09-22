import React from "react";
import RoomList from "./Components/RoomList";
import SearchBar from "../General/SearchBar";
import AddRoomBtn from "./Components/AddRoomBtn";

import colorConfg from "../../../colorConfg.json";

const SideBar = (props) => {
  const { roomList, joinRoom, setRoomList } = props;

  return (
    <aside className={`flex flex-col h-[90vh] max-w-xs bg-secondary`}>
      <SearchBar query="room" />
      <RoomList roomList={roomList} joinRoom={joinRoom} />
      <div className="mt-auto mx-auto">
        <AddRoomBtn roomList={roomList} setRoomList={setRoomList} />
      </div>
    </aside>
  );
};

export default SideBar;
