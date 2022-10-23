import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
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
import UserModal from "./UserModal";
import { Tooltip } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Logo from "../../Media/NameChatLogo3.png";

const NavBar = () => {
  const { user } = useContext(UserContext);
  const { logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

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
    <nav className="w-full h-13 flex items-center border-b-2 border-b-black border-solid px-6 py-2 text-3xl  bg-thirdy">
      <Link to="/">
        <span className="flex items-center justify-center gap-2 text-white font-bold">
          <img src={Logo} alt="Name logo" className="w-12" />
          <p className=""> Name Chat </p>
        </span>
      </Link>
      <div className="flex ml-auto gap-4">
        <Tooltip title="Your Profile">
          <button
            className="flex  items-center w-min text-white hover:text-gray-200"
            onClick={handleClickMenu}
            id="profile-button"
            aria-controls={opemMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={opemMenu ? "true" : undefined}
          >
            <AccountCircleIcon sx={{ color: "inherit" }} fontSize="large" />
            <ArrowDropDownIcon sx={{ color: "inherit" }} />
          </button>
        </Tooltip>
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
              handleCloseMenu();
              handleOpenModal();
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            Profile
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleCloseMenu();
              setOpenDrawer(true);
            }}
          >
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
      <Drawer
        anchor={"right"}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        settings
      </Drawer>
    </nav>
  );
};

export default NavBar;
