import React from "react";
import RoomList from "./Components/RoomList";
import RoomSearch from "../General/SearchBar";

const SideBar = () => {
  return (
    <aside className="flex flex-col h-[90vh] max-w-xs border-black border-solid border-2">
      <RoomSearch />
      <RoomList />
      <button className="mt-auto border-black border-solid border-2 p-2">
        create room
      </button>
    </aside>
  );
};

export default SideBar;
