import React, { useState } from "react";
import RoomList from "./Components/RoomList";
import SearchBar from "../General/SearchBar";
import AddRoomBtn from "./Components/AddRoomBtn";

import colorConfg from "../../../colorConfg.json";

const SideBar = (props) => {
  const { roomList, joinRoom, setRoomList } = props;
  const [filteredRoomList, editList] = useState(roomList);

  //passing that function to the search bar component
  const filterRooms = (filter) => {
    editList(() => {
      return roomList.filter((e) => e.name === filter);
    });
    console.log(roomList);
  };

  const clearFilter = () => {
    editList(roomList);
  };

  return (
    <aside className={`flex flex-col h-[90vh] max-w-xs bg-secondary`}>
      <SearchBar
        query="room"
        filterRooms={filterRooms}
        clearFilter={clearFilter}
      />
      <RoomList roomList={filteredRoomList} joinRoom={joinRoom} />
      <div className="mt-auto mx-auto">
        <AddRoomBtn roomList={filteredRoomList} setRoomList={editList} />
      </div>
    </aside>
  );
};

export default SideBar;
