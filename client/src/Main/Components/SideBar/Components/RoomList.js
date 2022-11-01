import React, { useContext } from "react";
import RoomItem from "./RoomItem";
import { UserContext } from "../../../../contexts/UserContextProvider";

const RoomList = ({ roomList }) => {
  const { darkMode } = useContext(UserContext);

  return (
    <section
      className={`flex flex-col overflow-auto overflow-x-hidden h-full ${darkMode ? "scrollbar-dark" : "scrollbar"}`}
    >
      {roomList.map((element) => (
        <RoomItem room={element} key={element._id} />
      ))}
    </section>
  );
};

export default RoomList;
