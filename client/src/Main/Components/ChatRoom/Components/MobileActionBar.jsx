import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Drawer } from "@mui/material";
import SideBar from "../../SideBar/SideBar";
import ProfilesSideBar from "./ProfilesSideBar";
const MobileActionBar = ({ roomList, setRoomList, selectedRoom }) => {
  const [openDrawerRoomList, setOpenDrawerRoomList] = useState(false);
  const [openDrawerPopList, setOpenDrawerPopList] = useState(false);

  return (
    <div className="w-full h-max bg-secondary p-2 flex justify-between md:hidden ">
      <button className="" onClick={() => setOpenDrawerRoomList(true)}>
        <MenuIcon />
      </button>
      <button onClick={() => setOpenDrawerPopList(true)}>
        <PeopleAltIcon />
      </button>
      <Drawer
        anchor={"left"}
        open={openDrawerRoomList}
        onClose={() => setOpenDrawerRoomList(false)}
      >
        <SideBar
          roomList={roomList}
          setRoomList={setRoomList}
          isShown={openDrawerRoomList}
        />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={openDrawerPopList}
        onClose={() => setOpenDrawerPopList(false)}
      >
        <ProfilesSideBar
          selectedRoom={selectedRoom}
          isShown={openDrawerPopList}
        />
      </Drawer>
    </div>
  );
};

export default MobileActionBar;
