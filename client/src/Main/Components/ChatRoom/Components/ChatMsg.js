import React, { useContext, useState } from "react";
import { UserContext } from "../../../../contexts/UserContextProvider";

import Link from "@mui/material/Link";
import { Alert } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UserModal from "../../General/UserModal";

const ChatMsg = ({ msgWriter, msgContent, msgTime, msgId, setMsg, delMsg }) => {
  const { user } = useContext(UserContext);
  const loggedUserName = user.userName;
  const isLoggedInUser = loggedUserName === msgWriter; //boolean value represents if the message is written by the logged in user
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [bgBool, setbgBool] = useState(false);

  const artist = {
    userName: msgWriter,
    email: "wtf",
    profilePictureUrl: "wtf2",
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [openModal, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  console.log(`msg id is ${msgId}`);

  return (
    <div
      className={`max-w-max p-3 gap-3 font-bold justify-around border-2 border-black border-solid rounded-md hover:bg-primary ${
        isLoggedInUser ? "self-end bg-secondary" : "bg-thirdy"
      } ${!bgBool ? null : "bg-red-600"}`}
    >
      <button onClick={handleOpenModal}>
        <Link>{msgWriter}</Link>
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
            setbgBool(true);
            delMsg(msgId);
          }}
        >
          Delete message
        </MenuItem>
        <MenuItem onClick={handleClose}>Edit message </MenuItem>
        <MenuItem onClick={handleClose}>Get 1,000,000$</MenuItem>
      </Menu>
      <UserModal
        open={openModal}
        userInfo={artist}
        handleClose={handleCloseModal}
      />
    </div>
  );
};

export default ChatMsg;
