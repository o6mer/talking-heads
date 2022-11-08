import React, { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContextProvider";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { socket } from "../../../MainPage.js";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Link } from "react-router-dom";

const RoomDetails = ({ people, name, roomId }) => {
  const { darkMode, user } = useContext(UserContext);
  const userId = user._id;

  const deleteRoom = () => {
    socket.emit("delRoom", userId, roomId, (response) => {
      if (response.statusCode === 400) alert(response.message);
      else console.log(response);
    });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={`${darkMode ? "bg-thirdyDark" : "bg-thirdy"} p-4 flex`}>
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold">{name}</p>
        <p>{`Users in room: ${people.length}`}</p>
      </div>
      <div className="ml-auto mt-auto flex flex-col">
        <div>
          <div onClick={handleClick} className="hover:cursor-pointer">
            <MoreVertIcon
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            />
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link to={`/main`}>
                <div className="flex gap-2">
                  <MeetingRoomIcon /> <p>leave room</p>
                </div>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <div onClick={deleteRoom} className="mb-auto hover:cursor-pointer flex gap-2">
                <DeleteForeverIcon /> <p>delete room</p>
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};
export default RoomDetails;
