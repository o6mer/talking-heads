import React, { useContext } from "react";
import RoomItem from "./RoomItem";
import { UserContext } from "../../../../contexts/UserContextProvider";

const RoomList = ({ roomList }) => {
  const { darkMode } = useContext(UserContext);

  return (
    <section
      className={`flex flex-col gap-0.5 overflow-auto overflow-x-hidden h-full ${
        darkMode ? "scrollbar-dark" : "scrollbar"
      }`}
    >
      {roomList.map((element) => (
        <RoomItem room={element} />
      ))}
    </section>
  );
};

export default RoomList;
