import React, { useContext, useEffect } from "react";
import SearchBar from "../../General/SearchBar";
import { useState } from "react";
import { socket } from "../../../MainPage";
import Logo from "../../../Media/NameLogo.png";
import UserModal from "../../../Components/General/UserModal.jsx";
import { UserContext } from "../../../../contexts/UserContextProvider";

const ProfilesSideBar = (props) => {
  const { pop } = props;
  const [people, setPeople] = useState(pop);

  const { darkMode } = useContext(UserContext);

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
      className={`flex flex-col max-w-max h-full border-0 border-solid border-black ${
        darkMode ? "bg-secondaryDark" : "bg-secondary"
      }`}
    >
      <SearchBar
        query="user"
        filterFunc={filterUser}
        clearFilter={clearFilter}
      />
      <section
        className={`flex flex-col  h-full overflow-y-auto ${
          darkMode ? "scrollbar-dark" : "scrollbar"
        }`}
      >
        {people.map((element) => {
          return <ProfilesSideBarItem user={element} key={element?._id} />;
        })}
      </section>
    </aside>
  );
};

const ProfilesSideBarItem = (props) => {
  const { darkMode } = useContext(UserContext);

  //modal stuff
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = props;
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
        <img className="w-8 h-8 rounded-md" src={Logo} alt="Profile Pic"></img>
        <p className={`flex  text-xl`}>{user.userName}</p>
      </div>
      <UserModal open={open} userInfo={user} handleClose={handleClose} />
    </>
  );
};

export default ProfilesSideBar;
