import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../contexts/UserContextProvider";
import { socket } from "../../../MainPage";

const RoomItem = (props) => {
  const { _id, name, maxPop, pop, messages, currentSong } = props.room;
  const { joinRoom } = props;

  const { setCurrentRoom, user } = useContext(UserContext);
  const rowContainerStyle = "flex gap-3 p-2 items-center justify-between ";

  const onRoomClickHandler = async () => {
    socket.emit("join-room", _id, user._id);
    setCurrentRoom(props.room);

    try {
      const response = await fetch(
        `http://localhost:3001/api/room/joinRoom/${_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id }),
        }
      );
      const resData = await response.json();

      if (response.ok)
        setCurrentRoom((currentRoom) => {
          const updatedRoom = { ...currentRoom, pop: resData.pop };
          return { ...updatedRoom };
        });
    } catch (error) {
      console.log(error);
    }
  };

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
