import React, { useContext, useEffect, useState } from "react";
import RoomList from "./Components/RoomList";
import SearchBar from "../General/SearchBar";
import AddRoomBtn from "./Components/AddRoomBtn";
import { UserContext } from "../../../contexts/UserContextProvider";
import { socket } from "../../MainPage";
import { useNavigate } from "react-router-dom";

const SideBar = (props) => {
  const { roomList, joinRoom } = props;
  const [filteredRoomList, setList] = useState(roomList);
  const navigate = useNavigate();

  const { darkMode, currentRoomId } = useContext(UserContext);
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
    socket.on("roomDeleted", (roomId) => {
      deleteRoom(roomId);
      if (currentRoomId.toString() === roomId.toString()) {
        navigate("/main/");
      }
    });
  }, []);

  //delete a room in the front
  const deleteRoom = (roomId) => {
    setList(() => {
      return filteredRoomList.filter((room) => room._id !== roomId);
    });
  };

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
