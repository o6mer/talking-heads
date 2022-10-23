import React, { useContext, useEffect } from "react";
import SearchBar from "../../General/SearchBar";
import { useState } from "react";
import { socket } from "../../../MainPage";

import Button from "@mui/material/Button";
import UserModal from "../../../Components/General/UserModal.jsx";
import { UserContext } from "../../../../contexts/UserContextProvider";

const ProfilesSideBar = (props) => {
  const { pop } = props;
  const [people, setPeople] = useState(pop); // might not need that use state and only use "pop"

  useEffect(() => {
    if (!pop) return;
    setPeople(pop);

    socket.on("userJoinedRoom", (userId, room) => {
      // setPeople((prev) => {
      //   return [...prev, userId];
      // });
      setPeople(room.usersInfo);
    });

    socket.on("userLeftRoom", (userId) => {
      setPeople((prev) => {
        return prev.filter((user) => user._id.toString() !== userId.toString());
      });
    });
  }, []);

  const filterUser = () => {
    console.log("filter user");
  };
  const clearFilter = () => {
    console.log("clear filter");
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
      <section className="flex flex-col gap-2 h-full">
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
    <div>
      <Button onClick={handleOpen} className="flex bg-primary pl-4">
        {user.userName}
      </Button>
      <UserModal open={open} userInfo={user} handleClose={handleClose} />
    </div>
  );
};

export default ProfilesSideBar;
