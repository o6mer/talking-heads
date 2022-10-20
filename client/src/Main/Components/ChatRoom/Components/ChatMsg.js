import React, { useContext, useState } from "react";
import { UserContext } from "../../../../contexts/UserContextProvider";

import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UserModal from "../../General/UserModal";

const ChatMsg = ({ msgWriter, msgContent, msgTime, msgId, setMsg, delMsg }) => {
  const { user } = useContext(UserContext);
  const loggedUserId = user._id;
  const isLoggedInUser = loggedUserId === msgWriter._id; //boolean value represents if the message is written by the logged in user
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [bgBool, setbgBool] = useState(false);

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
      className={`max-w-max p-3 gap-3 font-bold justify-around border-2 border-black border-solid rounded-md hover:bg-primary ${
        isLoggedInUser ? "self-end bg-secondary" : "bg-thirdy"
      } ${!bgBool ? null : "bg-red-600"}`}
    >
      <button onClick={handleOpenModal}>
        <Link>{msgWriter.userName}</Link>
      </button>

      <div
        className={`flex gap-4 text-xl ${
          isLoggedInUser ? "text-black" : "text-white"
        }`}
      >
        <p>{msgContent}</p>
      </div>

      <div className="flex">
        <p className="text-sm text-right">{msgTime}</p>
        <button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <KeyboardArrowDownIcon />
        </button>
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
            if (msgWriter._id === user._id) {
              // checking if the deleter is the message "owner"
              setbgBool(true);
              delMsg(msgId, user, msgWriter);
            } else {
              alert("bruh you can just delete other people messages...");
            }
          }}
        >
          Delete message
        </MenuItem>
        <MenuItem onClick={handleClose}>Edit message </MenuItem>
        <MenuItem onClick={handleClose}>Get 1,000,000$</MenuItem>
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
