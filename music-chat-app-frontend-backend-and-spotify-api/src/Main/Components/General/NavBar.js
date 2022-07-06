import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const NavBar = () => {
  return (
    <nav className="w-full flex items-center border-b-2 border-b-black border-solid px-6 py-2 text-3xl h-[10vh]">
      <Link to="/">
        <img src="" alt="logo" />
      </Link>
      <div className="flex ml-auto gap-4">
        <Link to="/">
          <AiOutlineSetting />{" "}
        </Link>
        <Link to="/">
          <CgProfile />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
