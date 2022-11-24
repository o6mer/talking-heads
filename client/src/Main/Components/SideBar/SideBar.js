import React, { useContext, useEffect, useState } from "react";
import RoomList from "./Components/RoomList";
import SearchBar from "../General/SearchBar";
import { UserContext } from "../../../contexts/UserContextProvider";
import { socket } from "../../MainPage";

const SideBar = ({ roomList, joinRoom, isShown, setOpen }) => {
  const [realRoomList, setRealList] = useState(roomList);
  const [filteredRoomList, setFilteredList] = useState(roomList);

  const { darkMode } = useContext(UserContext);

  useEffect(() => {
    //getting leftRoom and joinedRoom from backend and modifying the list
    socket.on("userChangedRoom", (joinedRoom, leftRoom) => {
      setFilteredList((prev) => {
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
      setRealList((prev) => {
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
    socket.on("roomDeleted", (roomId) => {
      deleteRoom(roomId);
    });
    socket.on("roomAdded", (newRoom) => {
      addRoom(newRoom);
    });
  }, []);

  //delete a room in the front
  const deleteRoom = (roomId) => {
    setFilteredList((prev) => {
      return prev.filter((room) => room._id !== roomId);
    });
    setRealList((prev) => {
      return prev.filter((room) => room._id !== roomId);
    });
  };

  //add a room in the front
  const addRoom = (addedRoom) => {
    setFilteredList((prev) => {
      return [...prev, addedRoom];
    });
    setRealList((prev) => {
      return [...prev, addedRoom];
    });
  };

  //only changing filtered list
  const filterRooms = (filter) => {
    setFilteredList(() => {
      return realRoomList.filter((e) => e.name.includes(filter));
    });
  };

  const clearFilter = () => {
    setFilteredList(realRoomList);
  };

  return (
    <aside
      className={`md:flex   ${
        isShown ? "flex" : "hidden"
      } flex-col h-full w-full max-w-xs ${
        darkMode ? "bg-secondaryDark text-white" : "bg-secondary text-black"
      } pb-4`}
    >
      <SearchBar
        query="room"
        filterFunc={filterRooms}
        clearFilter={clearFilter}
        setOpen={setOpen}
        isShown={isShown}
      />
      <RoomList roomList={filteredRoomList} joinRoom={joinRoom} />
    </aside>
  );
};

export default SideBar;
