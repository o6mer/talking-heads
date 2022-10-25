import React, { useContext, useState } from "react";
import RoomList from "./Components/RoomList";
import SearchBar from "../General/SearchBar";
import AddRoomBtn from "./Components/AddRoomBtn";
import { UserContext } from "../../../contexts/UserContextProvider";

const SideBar = (props) => {
  const { roomList, joinRoom } = props;
  const [filteredRoomList, editList] = useState(roomList);

  const { darkMode } = useContext(UserContext);

  //passing that function to the search bar component
  const filterRooms = (filter) => {
    editList(() => {
      return roomList.filter((e) => e.name.includes(filter));
    });
  };

  const clearFilter = () => {
    editList(roomList);
  };

  return (
    <aside
      className={`flex flex-col h-full max-w-xs ${
        darkMode ? "bg-secondaryDark" : "bg-secondary"
      } pb-4`}
    >
      <SearchBar
        query="room"
        filterFunc={filterRooms}
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
