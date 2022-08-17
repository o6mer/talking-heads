import React from "react";
import RoomList from "./Components/RoomList";
import RoomSearch from "../General/SearchBar";
import AddRoomBtn from "./Components/AddRoomBtn";

const SideBar = (props) => {
  const { roomList } = props;

  return (
    <aside className="flex flex-col h-[90vh] max-w-xs border-black border-solid border-2">
      <RoomSearch />
      <RoomList roomList={roomList} />
      {/* <button className="mt-auto border-black border-solid border-2 p-2">
        create room
      </button> */}
      <div className="mt-auto mx-auto">
        <AddRoomBtn />
      </div>
    </aside>
  );
};

export default SideBar;
