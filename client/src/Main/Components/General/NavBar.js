import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { UserContext } from "../../../contexts/UserContextProvider";
import axios from "axios";

const NavBar = () => {
  const { user } = useContext(UserContext);

  const clickHandler = async (e) => {
    e.preventDefault();
    console.log(user);
    // try {
    //   const req = await fetch(`http://localhost:3001/api/user/${user.userId}`);
    //   const data = await req.json();
    //   console.log(data.user);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <nav className="w-full flex items-center border-b-2 border-b-black border-solid px-6 py-2 text-3xl h-[10vh]">
      <Link to="/">
        <img src="" alt="logo" />
      </Link>
      <div className="flex ml-auto gap-4">
        <Link to="/">
          <AiOutlineSetting />{" "}
        </Link>
        <button onClick={clickHandler}>
          <CgProfile />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
