import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../../../contexts/UserContextProvider";
import { socket } from "../../../MainPage";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockIcon from "@mui/icons-material/Lock";

const RoomItem = ({ room }) => {
  const { _id, name, maxPop, pop, messages } = room;
  const rowContainerStyle = "flex p-1 items-center justify-between ";
  const { darkMode, currentRoomId } = useContext(UserContext);
  const isRoomFull = maxPop === pop.length;
  const [Lock, setLock] = useState(LockOutlinedIcon);

  const [shownMessage, setShownMessage] = useState(messages?.at(-1));
  const [route, setRoute] = useState(`/main/${_id}`);

  useEffect(() => {
    socket.on("receiveMsg", (msg, roomId) => {
      if (roomId === _id) setShownMessage(msg);
    });
    if (isRoomFull) setRoute("");
  }, []);

  const handleMouseHover = () => {
    setLock(LockIcon);
  };
  const handleMouseOut = () => {
    setLock(LockOutlinedIcon);
  };

  //maybe aravisti :|
  const truncate = (input) => {
    return input?.length > 16 ? `${input.substring(0, 16)}...` : input;
  };

  return (
    <Link to={route} onMouseOver={handleMouseHover} onMouseOut={handleMouseOut}>
      <div
        className={`flex flex-col gap-2 min-w-max border-black border-solid border-0 m-0 cursor-pointer p-4 box-border text-xl ${
          darkMode ? `hover:bg-primaryDark` : "hover:bg-primary"
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
