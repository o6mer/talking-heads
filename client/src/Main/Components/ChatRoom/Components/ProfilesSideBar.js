import React from "react";
import SearchBar from "../../General/SearchBar";
import { useState } from "react";

const ProfilesSideBar = (props) => {
  const { pop } = props;

  const [people, alterUsers] = useState(pop); // might not need that use state and only use "pop"

  const removeUser = (user) => {
    alterUsers((prev) => {
      const newArr = prev.filter((element) => {
        return element.id !== user.id; // keeps all the users which their id is not the given one
      });
    });
  };

  const addUser = (user) => {
    alterUsers(
      (prev) => prev.push(user) // adding the user to the array
    );
  };

  return (
    <aside className="flex flex-col max-w-max h-full">
      <SearchBar />
      <section className="flex flex-col gap-2 p-3 border-2 border-solid border-black h-full">
        {people.map((element) => {
          return <ProfilesSideBarItem user={element} />;
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
