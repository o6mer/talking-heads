import React, { useContext, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Drawer } from "@mui/material";
import SideBar from "../../SideBar/SideBar";
import ProfilesSideBar from "./ProfilesSideBar";
import { UserContext } from "../../../../contexts/UserContextProvider";
const MobileActionBar = ({ roomList, setRoomList, selectedRoom, isRoom }) => {
  const [openDrawerRoomList, setOpenDrawerRoomList] = useState(false);
  const [openDrawerPopList, setOpenDrawerPopList] = useState(false);
  const { darkMode } = useContext(UserContext);

  useEffect(() => {
    if (!isRoom) setOpenDrawerPopList(false);
  }, [isRoom]);

  return (
    <div
      className={`w-full h-max px-6  ${
        darkMode ? "bg-thirdy" : "bg-secondary"
      } p-2 flex justify-between md:hidden`}
    >
      <button className="" onClick={() => setOpenDrawerRoomList(true)}>
        <MenuIcon />
      </button>
      {isRoom && (
        <button onClick={() => setOpenDrawerPopList(true)}>
          <PeopleAltIcon />
        </button>
      )}
      <Drawer
        anchor={"left"}
        open={openDrawerRoomList}
        onClose={() => setOpenDrawerRoomList(false)}
        variant="temporary"
      >
        <SideBar
          roomList={roomList}
          setRoomList={setRoomList}
          isShown={openDrawerRoomList}
          setOpen={setOpenDrawerRoomList}
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
          setOpen={setOpenDrawerPopList}
        />
      </Drawer>
    </div>
  );
};

export default MobileActionBar;
