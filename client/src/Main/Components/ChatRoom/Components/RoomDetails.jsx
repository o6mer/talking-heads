import React, { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContextProvider";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { Link } from "react-router-dom";

const RoomDetails = ({ people, name }) => {
  const { darkMode } = useContext(UserContext);

  return (
    <div className={`${darkMode ? "bg-fourthy" : "bg-thirdy"} p-4 flex`}>
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold">{name}</p>
        <p>{`Users in room: ${people.length}`}</p>
      </div>
      <div className="ml-auto mt-auto">
        <Link to={`/main`}>
          <MeetingRoomIcon />
        </Link>
      </div>
    </div>
  );
};
export default RoomDetails;
