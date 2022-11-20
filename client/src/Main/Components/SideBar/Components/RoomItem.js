import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../../../contexts/UserContextProvider";
import { socket } from "../../../MainPage";
import Logo from "../../../../Media/NameLogo.png";
import Tooltip from "@mui/material/Tooltip";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const RoomItem = ({ room }) => {
  const { _id, name, maxPop, pop, messages } = room;
  const rowContainerStyle = "flex p-1 items-center justify-between ";
  const { darkMode, currentRoomId } = useContext(UserContext);
  const [shownMessage, setShownMessage] = useState(messages?.at(-1));
  const [showRoomPop, setShowRoomPop] = useState(false);
  const isRoomFull = maxPop === pop.length;

  useEffect(() => {
    socket.on("receiveMsg", (msg, roomId) => {
      if (roomId === _id) setShownMessage(msg);
    });
  }, []);

  return (
    <Tooltip title={name} placement="right" arrow>
      <Link
        to={`/main/${_id}`}
        className={`flex items-center gap-3 w-full max-w-full m-0 cursor-pointer py-2 px-4 box-border text-xl transition-[background-color]  border-b-2  border-solid ${
          darkMode ? `hover:bg-primaryDark border-b-gray-700` : "hover:bg-primary border-b-gray-300"
        } ${currentRoomId === _id ? (darkMode ? "bg-primaryDark" : "bg-primary") : null}`}
        onMouseOver={(e) => {
          setShowRoomPop(true);
        }}
        onMouseLeave={(e) => {
          setShowRoomPop(false);
        }}
      >
        <img className="rounded-xl shadow-md" src={Logo} alt="roomPic" width="50" />
        <div className="flex flex-col w-full justify-between ">
          <div className="flex text-lg  items-center justify-between gap-3 w-full transition-all">
            <p className="text-xl font-bold w-[11rem] text-ellipsis overflow-hidden whitespace-nowrap ">
              {name} {isRoomFull && <LockOutlinedIcon color="error" />}
            </p>
            <p
              className={`${showRoomPop ? "block" : "hidden"} transition-all text-gray-500 text-md`}
            >{`${pop.length}/${maxPop}`}</p>
          </div>
          <div className={"flex text-lg text-gray-500 items-center justify-between gap-3 w-full"}>
            <p className="max-w-[9rem] text-ellipsis overflow-hidden whitespace-nowrap">
              {shownMessage?.msgContent || "no messages..."}
            </p>
            <p className="">{shownMessage?.msgTime || ""}</p>
          </div>
        </div>
      </Link>
    </Tooltip>
  );
};

export default RoomItem;
