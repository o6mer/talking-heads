import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../../../contexts/UserContextProvider";

const RoomItem = ({ room }) => {
  const { _id, name, maxPop, pop, messages } = room;
  const rowContainerStyle = "flex p-1 items-center justify-between ";
  const { darkMode, currentRoomId } = useContext(UserContext);

  return (
    <Link to={`/main/${_id}`}>
      <div
        className={`flex flex-col gap-2 min-w-max border-black border-solid border-0 m-0 cursor-pointer p-4 box-border text-xl ${
          darkMode ? `hover:bg-primaryDark` : "hover:bg-primary"
        } ${
          currentRoomId === _id
            ? darkMode
              ? "bg-primaryDark"
              : "bg-primary"
            : null
        }`}
      >
        <div className={rowContainerStyle}>
          <p className="text-2xl font-bold">{name}</p>
          <p className="font-bold">
            <span
              className={
                maxPop === pop.length
                  ? "text-red-600"
                  : `${darkMode ? "text-white" : "text-black"}`
              }
            >{`${pop.length}`}</span>
            <span className="">{`/${maxPop}`}</span>
          </p>
        </div>
        <div
          className={"flex text-xl text-gray-500 w-full items-center gap-3 p-1"}
        >
          <p>{messages?.at(-1)?.msgContent}</p>
          <p className="">{messages?.at(-1)?.msgTime}</p>
        </div>
      </div>
    </Link>
  );
};

export default RoomItem;
