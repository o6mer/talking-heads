import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { UserContext } from "../../../contexts/UserContextProvider";
import useAuth from "../../../Landing/hooks/useAuth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import UserModal from "./UserModal";

const NavBar = () => {
  const { user } = useContext(UserContext);
  const { logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const opemMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <nav className="w-full flex items-center border-b-2 border-b-black border-solid px-6 py-2 text-3xl h-max bg-thirdy">
      <Link to="/">
        <img src="" alt="logo" />
      </Link>
      <div className="flex ml-auto gap-4">
        <button
          className="flex  items-center w-min"
          onClick={handleClickMenu}
          id="profile-button"
          aria-controls={opemMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={opemMenu ? "true" : undefined}
        >
          <AccountCircleIcon
            sx={{ color: "white" }}
            fontSize="large"
            className="self-end"
          />
          <ArrowDropDownIcon sx={{ color: "white" }} className="slef-start" />
        </button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={opemMenu}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={(e) => {
              console.log("open modal");
              handleOpenModal();
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            Profile
          </MenuItem>

          <MenuItem onClick={handleCloseMenu}>
            <ListItemIcon onClick={handleCloseMenu}>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>

          <Divider />

          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
      <UserModal
        open={openModal}
        userInfo={user}
        handleClose={handleCloseModal}
      />
    </nav>
  );
};

export default NavBar;
