import React, { useContext, useEffect } from "react";
import SearchBar from "../../General/SearchBar";
import { useState } from "react";
import { socket } from "../../../MainPage";

import UserModal from "../../../Components/General/UserModal.jsx";

const ProfilesSideBar = (props) => {
  const { pop } = props;
  const [people, setPeople] = useState(pop);

  useEffect(() => {
    if (!pop) return;
    setPeople(pop);

    socket.on("userJoinedRoom", (userId, room) => {
      setPeople(room.usersInfo);
    });

    socket.on("userLeftRoom", (userId) => {
      setPeople((prev) => {
        return prev.filter((user) => user._id.toString() !== userId.toString());
      });
    });
  }, []);

  const filterUser = (filter) => {
    console.log(filter);
    setPeople(() => {
      return pop.filter((e) => e.userName.includes(filter));
    });
  };

  const clearFilter = () => {
    setPeople(pop);
  };

  return (
    <aside
      className={`flex flex-col max-w-max h-full border-0 border-solid border-black bg-secondary`}
    >
      <SearchBar
        query="user"
        filterFunc={filterUser}
        clearFilter={clearFilter}
      />
      <section className="flex flex-col gap-0 h-full">
        {people.map((element) => {
          return <ProfilesSideBarItem user={element} />;
        })}
      </section>
    </aside>
  );
};

const ProfilesSideBarItem = (props) => {
  //modal stuff
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = props;
  return (
    <div
      className={`hover:cursor-pointer hover:bg-primary bg-secondary flex pr-4`}
    >
      <p onClick={handleOpen} className={`flex pl-4 my-0 py-2.5 text-xl`}>
        {user.userName}
      </p>
      <img
        className="w-8 h-8 my-auto ml-auto rounded-full"
        src={`@@@name chat logo here@@@`}
      ></img>
      <UserModal open={open} userInfo={user} handleClose={handleClose} />
    </div>
  );
};

export default ProfilesSideBar;
