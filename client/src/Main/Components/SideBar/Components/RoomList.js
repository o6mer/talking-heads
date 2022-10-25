import React, { useContext } from "react";
import RoomItem from "./RoomItem";
import { UserContext } from "../../../../contexts/UserContextProvider";

const RoomList = ({ roomList, selectedRoom }) => {
  const { darkMode } = useContext(UserContext);

  return (
    <section
      className={`overflow-auto overflow-x-hidden h-full ${
        darkMode ? "scrollbar-dark" : "scrollbar"
      }`}
    >
      {roomList.map((element) => (
        <RoomItem room={element} selectedRoom={selectedRoom} />
      ))}
    </section>
  );
};

export default RoomList;
