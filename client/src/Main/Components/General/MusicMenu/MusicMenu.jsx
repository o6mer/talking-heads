import { Menu } from "@mui/material";
import React from "react";
import Dashboard from "../../SpotifyApi/Dashboard";

const MusicMenu = ({ setAnchorEl, anchorEl, openMenu, musicRef }) => {
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  if (!musicRef.current) return null;
  return (
    <>
      <Menu
        className={`${openMenu ? "" : "hidden"}`}
        id="music-menu"
        anchorEl={musicRef.current}
        open={true}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Dashboard />
      </Menu>
    </>
  );
};

export default MusicMenu;
