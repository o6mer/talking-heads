import React, { useContext, useEffect } from "react";
import SearchBar from "../../General/SearchBar";
import { useState } from "react";
import { socket } from "../../../MainPage";
import { UserContext } from "../../../../contexts/UserContextProvider";
import Button from "@mui/material/Button";

import UserModal from "../../../Components/General/UserModal.jsx";

const ProfilesSideBar = (props) => {
  const { pop } = props;
  const [people, setPeople] = useState(pop); // might not need that use state and only use "pop"

  console.log("people:");
  console.log(pop);

  useEffect(() => {
    if (!pop) return;
    setPeople(pop);
  }, []);

  const filterUser = () => {
    console.log("filter user");
  };
  const clearFilter = () => {
    console.log("clear filter");
  };

  useEffect(() => {
    socket.on("userJoinedRoom", (userId) => {
      setPeople((prev) => {
        return [...prev, userId];
      });
    });

    socket.on("userLeftRoom", (userId) => {
      setPeople((prev) => {
        return prev.filter((user) => user !== userId);
      });
    });
  }, []);

  const removeUser = (user) => {
    setPeople((prev) => {
      const newArr = prev.filter((element) => {
        return element.id !== user.id; // keeps all the users which their id is not the given one
      });
    });
  };

  const addUser = (user) => {
    setPeople(
      (prev) => prev.push(user) // adding the user to the array
    );
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
      <section className="flex flex-col gap-2  h-full">
        {people.map((element) => {
          return <ProfilesSideBarItem user={element} />;
        })}
      </section>
    </aside>
  );
};

const ProfilesSideBarItem = (props) => {
  const { user } = props;
  //modal stuff
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
