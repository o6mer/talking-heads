import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../contexts/UserContextProvider";
import { socket } from "../../../MainPage";

const RoomItem = (props) => {
  const { _id, name, maxPop, pop, messages, currentSong } = props.room;

  const { setCurrentRoomId } = useContext(UserContext);
  console.log();
  const rowContainerStyle = "flex gap-3 p-2 items-center justify-between ";

  return (
    <Link
      to={`/main/${_id}`}
      onClick={(e) => {
        socket.emit("join-room", _id);
        setCurrentRoomId(_id);
      }}
    >
      <div
        className={`flex flex-col gap-2 min-w-max border-black border-solid border-2  hover:bg-blue-300 cursor-pointer p-4 box-border text-xl font-bold ${
          _id === 1 && "bg-blue-200"
        }`}
      >
        <div className={rowContainerStyle}>
          <p>{name}</p>
          <p>{`${pop.length}/${maxPop}`}</p>
        </div>
        <div className={rowContainerStyle}>
          <p>{currentSong}</p>
          <button //Room button!
            className="border-black border-solid border-2 p-2
            hover:bg-gray-500"
            onClick={(e) => console.log(e.target)}
          >
            play
          </button>
        </div>
      </div>
    </Link>
  );
};

export default RoomItem;
