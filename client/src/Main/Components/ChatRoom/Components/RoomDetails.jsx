import React, { useContext, useState } from "react";
import { UserContext } from "../../../../contexts/UserContextProvider";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UserModal from "../../General/UserModal";

import { Link } from "react-router-dom";

const RoomDetails = ({ room }) => {
  const { roomCreator } = room;
  const { darkMode, user, socket } = useContext(UserContext);
  const userId = user._id;
  const isRoomCreator = userId.toString() === roomCreator._id.toString();

  //modal stuff
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const deleteRoom = () => {
    socket.emit("delRoom", userId, room._id, (response) => {
      if (response.statusCode === 400) alert(response.message);
    });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className={`${darkMode ? "bg-fourthy" : "bg-thirdy"} p-4 flex`}>
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold">{room.name}</p>
        <p
          onClick={handleOpenModal}
          className="hover:text-primary hover:cursor-pointer"
        >{`Owner: ${roomCreator.userName}`}</p>
        <UserModal
          open={openModal}
          userInfo={roomCreator}
          handleClose={handleCloseModal}
          selectedRoom={room}
        />
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
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleCloseMenu}>
              <Link to={`/main`}>
                <div className="flex gap-2">
                  <MeetingRoomIcon /> <p>leave room</p>
                </div>
              </Link>
            </MenuItem>
            {isRoomCreator && (
              <MenuItem onClick={handleCloseMenu}>
                <div
                  onClick={deleteRoom}
                  className="mb-auto hover:cursor-pointer flex gap-2"
                >
                  <DeleteForeverIcon /> <p>delete room</p>
                </div>
              </MenuItem>
            )}
          </Menu>
        </div>
      </div>
    </div>
  );
};
export default RoomDetails;
