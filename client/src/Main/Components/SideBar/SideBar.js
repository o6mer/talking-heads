import React, { useContext, useEffect, useState } from "react";
import RoomList from "./Components/RoomList";
import SearchBar from "../General/SearchBar";
import AddRoomBtn from "./Components/AddRoomBtn";
import { UserContext } from "../../../contexts/UserContextProvider";
import { socket } from "../../MainPage";

const SideBar = (props) => {
  const { roomList, joinRoom } = props;
  const [filteredRoomList, setList] = useState(roomList);

  const { darkMode } = useContext(UserContext);

  useEffect(() => {
    //getting leftRoom and joinedRoom from backend and modifying the list
    socket.on("userChangedRoom", (joinedRoom, leftRoom) => {
      setList((prev) => {
        return prev.map((room) => {
          if (!joinedRoom) {
            if (leftRoom?._id === room._id) room = leftRoom;
          }

          if (room?._id === joinedRoom?._id) room = joinedRoom;

          if (!leftRoom || !room) return room;

          if (room?._id === leftRoom?._id) room = leftRoom;

          return room;
        });
      });
    });
  }, []);

  //passing that function to the search bar component
  const filterRooms = (filter) => {
    setList(() => {
      return roomList.filter((e) => e.name.includes(filter));
    });
  };

  const clearFilter = () => {
    setList(roomList);
  };

  return (
    <aside className={`flex flex-col h-full max-w-xs ${darkMode ? "bg-secondaryDark" : "bg-secondary"}`}>
      <SearchBar query="room" filterFunc={filterRooms} clearFilter={clearFilter} />
      <RoomList roomList={filteredRoomList} joinRoom={joinRoom} setRoomList={setList} />
    </aside>
  );
};

export default SideBar;
