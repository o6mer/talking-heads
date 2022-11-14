import React from "react";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Link } from "react-router-dom";

export default function RoomsMenu({ userRoomList }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="flex gap-1"
      >
        <p>Rooms</p>
        <KeyboardArrowDownIcon />
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
        {userRoomList.length === 0 ? (
          <MenuItem onClick={handleClose}>user has no rooms</MenuItem>
        ) : (
          userRoomList.map((room) => (
            <MenuItem onClick={handleClose}>
              <Link to={`/main/${room._id}`}>{room.name}</Link>
            </MenuItem>
          ))
        )}
      </Menu>
    </div>
  );
}
