import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../../../contexts/UserContextProvider";
import { socket } from "../../../MainPage";

const RoomItem = ({ room }) => {
  const { _id, name, maxPop, pop, messages } = room;
  const rowContainerStyle = "flex p-1 items-center justify-between ";
  const { darkMode, currentRoomId } = useContext(UserContext);
  const [shownMessage, setShownMessage] = useState(messages?.at(-1));
  const isRoomFull = maxPop === pop.length;
  const [Lock, setLock] = useState(LockOutlinedIcon);
  const [route, setRoute] = useState(`/main/${_id}`);

  useEffect(() => {
    socket.on("receiveMsg", (msg, roomId) => {
      if (roomId === _id) setShownMessage(msg);
    });
  }, []);

  return (
    <Tooltip title={name} placement="right" arrow>
      <Link
        to={`/main/${_id}`}
        className={`flex items-center gap-3 w-full max-w-full m-0 cursor-pointer py-2 px-4 box-border text-xl transition-all  border-b-2  border-solid ${
          darkMode ? `hover:bg-primaryDark border-b-gray-700` : "hover:bg-primary border-b-gray-300"
        } ${currentRoomId === _id ? (darkMode ? "bg-primaryDark" : "bg-primary") : null}`}
      >
        <div className={rowContainerStyle}>
          <p className="text-2xl font-bold">
            {name} {isRoomFull && <Lock color="error" />}
          </p>
          <p className="font-bold">
            <span className={`${darkMode ? "text-white" : "text-black"}`}>{`${pop.length}`}</span>
            <span className="">{`/${maxPop}`}</span>
          </p>
        </div>
        <div className={"flex text-xl text-gray-500 w-full items-center gap-3 p-1"}>
          <p>{truncate(shownMessage?.msgContent)}</p>
          <p className="ml-auto">{shownMessage?.msgTime}</p>
        </div>
      </div>
    </Link>
  );
};

export default RoomItem;
