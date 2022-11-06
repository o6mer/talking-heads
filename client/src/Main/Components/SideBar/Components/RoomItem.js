import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../../../contexts/UserContextProvider";
import { socket } from "../../../MainPage";
import Logo from "../../../../Media/NameLogo.png";
import Tooltip from "@mui/material/Tooltip";

const RoomItem = ({ room }) => {
  const { _id, name, maxPop, pop, messages } = room;
  const rowContainerStyle = "flex items-center justify-between ";
  const { darkMode, currentRoomId } = useContext(UserContext);

  const [shownMessage, setShownMessage] = useState(messages?.at(-1));

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
        <img className="rounded-xl shadow-md" src={Logo} alt="roomPic" width="50" />
        <div className="flex flex-col w-full justify-between ">
          <p className="text-xl font-bold w-[11rem] text-ellipsis overflow-hidden whitespace-nowrap">{name}</p>
          <div className={"flex text-lg text-gray-500 items-center justify-start gap-3 w-full"}>
            {/* <p className="font-bold">
            <span className={maxPop === pop.length ? "text-red-600" : ``}>{`${pop.length}`}</span>
            <span className="">{`/${maxPop}`}</span>
          </p> */}
            <p className="max-w-[9rem] text-ellipsis overflow-hidden whitespace-nowrap">
              {shownMessage?.msgContent || ""}
            </p>
            <p className="ml-auto">{shownMessage?.msgTime || ""}</p>
          </div>
        </div>
      </Link>
    </Tooltip>
  );
};

export default RoomItem;
