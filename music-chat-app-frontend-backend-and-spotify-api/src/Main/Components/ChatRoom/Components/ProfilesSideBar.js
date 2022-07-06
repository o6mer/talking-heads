import React from "react";
import SearchBar from "../../General/SearchBar";

const ProfilesSideBar = () => {
  return (
    <aside className="flex flex-col max-w-max h-full">
      <SearchBar />
      <section className="flex flex-col gap-2 p-3 border-2 border-solid border-black h-full">
        <ProfilesSideBarItem />
        <ProfilesSideBarItem />
        <ProfilesSideBarItem />
      </section>
    </aside>
  );
};

const ProfilesSideBarItem = ({ profileImg = "img", profileName = "name" }) => {
  return (
    <div className="flex">
      <img src={profileImg} alt={profileName} />
      <h3>{profileName}</h3>
    </div>
  );
};

export default ProfilesSideBar;
