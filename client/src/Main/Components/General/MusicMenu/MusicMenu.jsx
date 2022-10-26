import { Menu } from "@mui/material";
import React, { useContext, useState } from "react";
import useAuth from "../../../../Landing/hooks/useAuth";
import { UserContext } from "../../../../contexts/UserContextProvider";
import Dashboard from "../../SpotifyApi/Dashboard";

const MusicMenu = ({ setAnchorEl, anchorEl, openMenu, code }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Menu
      className={`${openMenu ? "" : "hidden"}`}
      id="music-menu"
      anchorEl={anchorEl}
      open={true}
      onClose={handleCloseMenu}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <Dashboard code={code} />
    </Menu>
  );
};

export default MusicMenu;
