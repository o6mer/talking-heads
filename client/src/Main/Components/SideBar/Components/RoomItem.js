import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../contexts/UserContextProvider";
import Tooltip from "@mui/material/Tooltip";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const RoomItem = ({ room }) => {
  const { _id, name, maxPop, image, pop, messages } = room;
  const { darkMode, currentRoomId, socket } = useContext(UserContext);
  const [shownMessage, setShownMessage] = useState(messages?.at(-1));
  const [showRoomPop, setShowRoomPop] = useState(false);

  const [route, setRoute] = useState(`/main/${_id}`);
  const isRoomFull = maxPop === pop.length;

  useEffect(() => {
    socket.on("receiveMsg", (msg, roomId) => {
      if (roomId === _id) setShownMessage(msg);
    });
    socket.on("removeMsg", (lastMsg, roomId) => {
      if (roomId === _id) setShownMessage(lastMsg);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isRoomFull) setRoute("");
    if (!isRoomFull) setRoute(`/main/${_id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRoomFull]);

  return (
    <Tooltip title={name} placement="right" arrow>
      <Link
        to={route}
        className={`flex items-center gap-3 w-full  m-0 cursor-pointer py-2 px-4 box-border text-xl transition-[background-color]  border-b-2  border-solid ${
          darkMode
            ? `hover:bg-primaryDark border-b-gray-700`
            : "hover:bg-primary border-b-gray-300"
        } ${
          currentRoomId === _id
            ? darkMode
              ? "bg-primaryDark"
              : "bg-primary"
            : null
        }`}
        onMouseOver={(e) => {
          setShowRoomPop(true);
        }}
        onMouseLeave={(e) => {
          setShowRoomPop(false);
        }}
      >
        <img
          className="rounded-xl shadow-md w-12 h-12"
          src={`data:image/jpg;base64, ${image}`}
          alt="roomPic"
        />
        <div className="flex flex-col w-full justify-between  ">
          <div className="flex text-lg  items-center justify-between gap-3 w-full transition-all">
            <p className="text-xl font-bold w-full text-ellipsis overflow-hidden whitespace-nowrap ">
              {name} {isRoomFull && <LockOutlinedIcon color="error" />}
            </p>
            <p
              className={`${
                showRoomPop ? "block" : "hidden"
              } transition-all text-gray-500 text-md`}
            >{`${pop.length}/${maxPop}`}</p>
          </div>
          <div
            className={
              "flex text-lg text-gray-500 items-center justify-between gap-3 w-full"
            }
          >
            <p className="w-full text-ellipsis overflow-hidden whitespace-nowrap">
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
