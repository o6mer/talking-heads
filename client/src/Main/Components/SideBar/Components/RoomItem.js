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

  //maybe aravisti :|
  const truncate = (input) => {
    return input?.length > 16 ? `${input.substring(0, 16)}...` : input;
  };

  return (
    <Link
      to={`/main/${_id}`}
      className={`flex items-center gap-3 w-full max-w-full  border-black border-solid border-0 m-0 cursor-pointer py-2 px-4 box-border text-xl text-gray-500 ${
        darkMode ? `hover:bg-primaryDark` : "hover:bg-primary"
      } ${currentRoomId === _id ? (darkMode ? "bg-primaryDark" : "bg-primary") : null}`}
    >
      <img className="rounded-xl" src={Logo} alt="roomPic" width="65" height="65" />
      <div className="flex flex-col w-full justify-between ">
        <p className="text-xl font-bold text-black">{name}</p>
        <div className={"flex text-lg text-gray-500 w-full items-center justify-start gap-3"}>
          {/* <p className="font-bold">
            <span className={maxPop === pop.length ? "text-red-600" : ``}>{`${pop.length}`}</span>
            <span className="">{`/${maxPop}`}</span>
          </p> */}
          <p className="">{`${truncate(shownMessage?.msgContent || "")}`}</p>
          <p className="ml-auto">{shownMessage?.msgTime || ""}</p>
        </div>
      </div>
    </Link>
  );
};

export default RoomItem;
