import React, { useContext } from "react";
import { Link } from "react-router-dom";

const RoomItem = (props) => {
  const { joinRoom } = props;
  const { _id, name, maxPop, pop, messages, currentSong } = props.room;

  const rowContainerStyle = "flex gap-3 p-2 items-center justify-between ";

  return (
    <Link
      to={`/main/${_id}`}
      onClick={(e) => {
        joinRoom(_id);
      }}
    >
      <div
        className={`flex flex-col gap-2 min-w-max border-black border-solid border-2  hover:bg-blue-300 cursor-pointer p-4 box-border text-xl font-bold`}
      >
        <div className={rowContainerStyle}>
          <p>{name}</p>
          <p>{`${pop.length}/${maxPop}`}</p>
        </div>
        <div className={rowContainerStyle}>
          <p>{currentSong}</p>
          <button //Room button!
            className="border-black border-solid border-2 p-2
            hover:bg-gray-5"
          >
            play
          </button>
        </div>
      </div>
    </Link>
  );
};

export default RoomItem;
