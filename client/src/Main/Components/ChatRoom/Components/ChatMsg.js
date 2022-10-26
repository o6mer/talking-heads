import React, { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContextProvider";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UserModal from "../../General/UserModal";
import DeleteIcon from "@mui/icons-material/Delete";

const ChatMsg = ({ msgWriter, msgContent, msgTime, msgId, setMsg, delMsg }) => {
  const { user, darkMode } = useContext(UserContext);
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
      className={`max-w-max p-3 gap-3 font-bold justify-around rounded-md text-white ${
        isLoggedInUser
          ? `self-end  ${
              darkMode
                ? "bg-[#18364d] hover:bg-primaryDark"
                : "bg-secondary hover:bg-[#c9d0dc]"
            }`
          : "bg-[#3262b2] hover:bg-fourthy"
      } shadow-[0_10px_10px_-10px_rgba(0,0,0,0.6)] min-w-[10%]`}
    >
      <button onClick={handleOpenModal}>
        <p
          className={`${
            isLoggedInUser
              ? `${darkMode ? "text-thirdyDark" : "text-thirdy"}`
              : `${darkMode ? "text-secondaryDark" : "text-secondary"}`
          }`}
        >
          {msgWriter.userName}
        </p>
      </button>

      <div className={`flex gap-4 text-xl `}>
        <p
          className={`${
            isLoggedInUser
              ? `${darkMode ? "text-white" : "text-black "}`
              : "text-white"
          }`}
        >
          {msgContent}
        </p>
      </div>

      <div className="flex">
        <p className="text-sm text-right text-[#a6bbc8]">{msgTime}</p>
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
          <div className="text-sm gap-1 flex">
            <div>
              <DeleteIcon fontSize="inherit" />
            </div>
            <div>Delete message</div>
          </div>
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
