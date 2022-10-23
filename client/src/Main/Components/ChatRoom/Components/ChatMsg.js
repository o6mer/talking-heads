import React, { useContext, useState } from "react";
import { UserContext } from "../../../../contexts/UserContextProvider";

import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UserModal from "../../General/UserModal";
import DeleteIcon from "@mui/icons-material/Delete";

const ChatMsg = ({ msgWriter, msgContent, msgTime, msgId, setMsg, delMsg }) => {
  const { user } = useContext(UserContext);
  const loggedUserId = user._id;
  const isLoggedInUser = loggedUserId === msgWriter._id; //boolean value represents if the message is written by the logged in user
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [openModal, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <div
      className={`max-w-max p-3 gap-3 font-bold justify-around border-2 border-fourthy border-solid rounded-md ${
        isLoggedInUser
          ? "self-end bg-secondary hover:bg-primary"
          : "bg-thirdy hover:bg-fourthy"
      }`}
    >
      <button onClick={handleOpenModal}>
        <p className={`${isLoggedInUser ? "text-thirdy" : "text-secondary"}`}>
          {msgWriter.userName}
        </p>
      </button>

      <div
        className={`flex gap-4 text-xl ${
          isLoggedInUser ? "text-black" : "text-black"
        }`}
      >
        <p>{msgContent}</p>
      </div>

      <div className="flex">
        <p className="text-sm text-right">{msgTime}</p>
        {isLoggedInUser && (
          <button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <KeyboardArrowDownIcon />
          </button>
        )}
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
        <MenuItem // delete message
          onClick={() => {
            handleClose();
            if (msgWriter._id === loggedUserId) {
              // checking if the deleter is the message "owner"
              delMsg(msgId, loggedUserId, msgWriter._id);
            } else {
              alert("bruh you can just delete other people messages...");
            }
          }}
        >
          <p className="text-sm">
            Delete message
            <DeleteIcon fontSize="inherit" />
          </p>
        </MenuItem>
      </Menu>
      <UserModal
        open={openModal}
        userInfo={msgWriter}
        handleClose={handleCloseModal}
      />
    </div>
  );
};

export default ChatMsg;
