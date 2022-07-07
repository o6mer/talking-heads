import React from "react";
import { Link } from "react-router-dom";

const RoomItem = ({
  roomId = 1,
  roomName = "room name",
  roomPop = 0,
  maxRoomPop = 10,
  currentSong = "current song",
}) => {
  const rowContainerStyle = "flex gap-3 p-2 items-center justify-between ";

  return (
    <Link to={`/main/${roomId}`}>
      <div
        className={`flex flex-col gap-2 min-w-max border-black border-solid border-2  hover:bg-blue-300 cursor-pointer p-4 box-border text-xl font-bold ${
          roomId === 1 && "bg-blue-200"
        }`}
      >
        <div className={rowContainerStyle}>
          <p>{roomName}</p>
          <p>{`${roomPop}/${maxRoomPop}`}</p>
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
