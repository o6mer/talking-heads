import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../../../contexts/UserContextProvider";
import { socket } from "../../../MainPage";
import Logo from "../../../../Media/NameLogo.png";

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
    <Link
      to={`/main/${_id}`}
      className={`flex items-center gap-3 w-full max-w-full m-0 cursor-pointer py-2 px-4 box-border text-xl text-gray-500 border-b-gray-300 border-b-2  border-solid ${
        darkMode ? `hover:bg-primaryDark` : "hover:bg-primary"
      } ${currentRoomId === _id ? (darkMode ? "bg-primaryDark" : "bg-primary") : null}`}
    >
      <img className="rounded-xl" src={Logo} alt="roomPic" width="65" height="65" />
      <div className="flex flex-col w-full justify-between ">
        <p className="text-xl font-bold text-black">{name}</p>
        <div className={"flex text-lg text-gray-500 items-center justify-start gap-3 w-full"}>
          {/* <p className="font-bold">
            <span className={maxPop === pop.length ? "text-red-600" : ``}>{`${pop.length}`}</span>
            <span className="">{`/${maxPop}`}</span>
          </p> */}
          <p className="max-w-[9rem] text-ellipsis overflow-hidden whitespace-nowrap">
            {shownMessage?.msgContent || ""}
          </p>
          {/* {shownMessage?.msgContent || ""} */}
          <p className="ml-auto">{shownMessage?.msgTime || ""}</p>
          {/* {shownMessage?.msgTime || ""} */}
        </div>
      </div>
    </Link>
  );
};

export default RoomItem;
