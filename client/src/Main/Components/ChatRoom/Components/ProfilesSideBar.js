import React, { useContext, useEffect } from "react";
import SearchBar from "../../General/SearchBar";
import { useState } from "react";
import { socket } from "../../../MainPage";
import { UserContext } from "../../../../contexts/UserContextProvider";

import colorConfg from "../../../../colorConfg.json";

const ProfilesSideBar = (props) => {
  const { pop } = props;
  const [people, setPeople] = useState(pop); // might not need that use state and only use "pop"

  useEffect(() => {
    if (!pop) return;
    setPeople(pop);
  }, []);

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
      <SearchBar query="user" />
      <section className="flex flex-col gap-2 p-3  h-full">
        {people.map((element) => {
          return <ProfilesSideBarItem user={element.toString()} />;
        })}
      </section>
    </aside>
  );
};

const ProfilesSideBarItem = (props) => {
  const { user } = props;
  return (
    <div className="flex">
      <h3>{user}</h3>
    </div>
  );
};

export default ProfilesSideBar;
