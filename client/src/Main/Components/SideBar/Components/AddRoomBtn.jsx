import React from "react";
import { useState, useEffect } from "react";

import AddRoomDialog from "./AddRoomDialog";
import { Collapse } from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddRoomBtn = ({ scrollToBottom }) => {
  const [open, setOpen] = useState(false);
  const [AddIcon, setAddIcon] = useState(AddCircleOutlineIcon);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {}, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseOver = (event) => {
    setAddIcon(AddCircleIcon);
    setHovered(true);
    setTimeout(scrollToBottom, 200);
  };
  const handleMouseOut = () => {
    setAddIcon(AddCircleOutlineIcon);
    setHovered(false);
  };

  return (
    <div>
      <div className={`text-center mt-4`} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
        <AddIcon fontSize="large" onClick={handleClickOpen} className="hover:cursor-pointer" />
        <Collapse in={hovered}>
          <p className="text-xl">Create a room</p>
        </Collapse>
        <AddRoomDialog open={open} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default AddRoomBtn;
