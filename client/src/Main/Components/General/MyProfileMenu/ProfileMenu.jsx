import { Divider, Drawer, ListItemIcon, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useContext, useState } from "react";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import UserModal from "../UserModal";
import useAuth from "../../../../Landing/hooks/useAuth";
import { UserContext } from "../../../../contexts/UserContextProvider";
import SettingsDrawer from "./SettingsDrawer";

const ProfileMenu = ({ setAnchorEl, anchorEl, openMenu }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { user, darkMode } = useContext(UserContext);

  const { logout } = useAuth();

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  console.log(openMenu);

  return (
    <div className="">
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: `${darkMode ? "black" : "white"}`,
            color: `${darkMode ? "white" : "black"}`,
          },
        }}
      >
        <MenuItem
          onClick={(e) => {
            console.log("open modal");
            handleCloseMenu();
            handleOpenModal();
          }}
        >
          <ListItemIcon className={`${darkMode ? "white" : "black"}`}>
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
        <SettingsDrawer />
      </Drawer>
    </div>
  );
};

export default ProfileMenu;
