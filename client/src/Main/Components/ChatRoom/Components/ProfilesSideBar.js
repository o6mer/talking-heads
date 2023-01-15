import React, { useContext, useEffect } from "react";
import SearchBar from "../../General/SearchBar";
import { useState } from "react";
import UserModal from "../../../Components/General/UserModal.jsx";
import { UserContext } from "../../../../contexts/UserContextProvider";

import RoomDetails from "./RoomDetails";

const ProfilesSideBar = ({ selectedRoom, isShown, setOpen }) => {
  const pop = selectedRoom.usersInfo;
  const [people, setPeople] = useState(pop);
  const { darkMode, socket } = useContext(UserContext);

  useEffect(() => {
    if (!pop) return;
    setPeople(pop);

    socket.on("userJoinedRoom", (userId, room) => {
      if (!room) return;

      setPeople(room.usersInfo);
    });

    socket.on("userLeftRoom", (userId) => {
      setPeople((prev) => {
        return prev.filter((user) => user._id.toString() !== userId.toString());
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterUser = (filter) => {
    setPeople(() => {
      return pop.filter((e) => e.userName.includes(filter));
    });
  };

  const clearFilter = () => {
    setPeople(pop);
  };

  return (
    <aside
      className={`md:flex ${
        isShown ? "flex" : "hidden"
      } flex-col max-w-max h-full border-0 border-solid border-black ${
        darkMode ? "bg-secondaryDark text-white" : "bg-secondary text-black"
      }`}
    >
      <SearchBar
        query="user"
        filterFunc={filterUser}
        clearFilter={clearFilter}
        setOpen={setOpen}
        isShown={isShown}
      />
      <section
        className={`flex flex-col  h-full overflow-y-auto ${
          darkMode ? "scrollbar-dark" : "scrollbar"
        }`}
      >
        {people.map((element) => {
          return (
            <ProfilesSideBarItem
              user={element}
              key={element?._id}
              selectedRoom={selectedRoom}
            />
          );
        })}
      </section>
      <RoomDetails room={selectedRoom} />
    </aside>
  );
};

const ProfilesSideBarItem = ({ user, selectedRoom }) => {
  const { darkMode } = useContext(UserContext);
  const { profilePicture } = user;
  const isCreator = user._id === selectedRoom.roomCreator._id.toString();

  //modal stuff
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div
        className={`hover:cursor-pointer   
      ${
        darkMode
          ? "bg-secondaryDark hover:bg-primaryDark"
          : "bg-secondary hover:bg-primary"
      } flex py-2 px-3 items-center justify-start gap-3 `}
        onClick={handleOpen}
      >
        <img
          className="w-8 h-8 rounded-md"
          alt="Profile Pic"
          src={`data:image/jpg;base64, ${profilePicture}`}
        ></img>
        <p className={`flex  text-xl ${isCreator && "text-thirdy"}`}>
          {user.userName}
        </p>
      </div>
      <UserModal
        open={open}
        userInfo={user}
        handleClose={handleClose}
        selectedRoom={selectedRoom}
      />
    </>
  );
};

export default ProfilesSideBar;
