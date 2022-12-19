import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../Media/talking_heads_logo1.png";
import LogoWhite from "../../../Media/talking_heads_logo_white_2.png";
import MobileNav from "./MobileNav";
const NavBar = () => {
  const linkStyles =
    "transition-all hover:-translate-y-0.5 hover:bg-[#c0f5b7] hover:text-black py-2 px-4 rounded-full hover:shadow-[0_10px_25px_-15px_rgba(0,0,0,0.4)]";

  return (
    <nav className="flex items-center justify-between text-l w-full max-w-5xl text-white py-3 px-6 md:px-0">
      <Link
        to="/"
        className="flex items-center justify-center gap-1 text-black font-bold py-2 transition-all"
      >
        <img src={LogoWhite} alt="Name logo" className="w-20" />
        {/* <p className="text-black"> Name Chat </p> */}
      </Link>
      <div className="hidden md:flex gap-1 items-center h-full ">
        <a href="#home" className={linkStyles}>
          Home
        </a>
        <a href="#how-it-works" className={linkStyles}>
          How It Works
        </a>
        {/* <a href="#features" className={linkStyles}>
          Features
        </a> */}
        {/* <a href="#help" className={linkStyles}>
          Help
        </a> */}

        <div className="w-[1px] h-[60%] bg-slate-300"> </div>

        <Link to="/signup" className={linkStyles}>
          Signup
        </Link>
        <Link
          to="/login"
          className="text-black bg-[#c0f5b7] py-2 px-4 rounded-full hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-15px_rgba(0,0,0,0.4)] transition-all"
        >
          Login
        </Link>
      </div>
      <MobileNav />
    </nav>
  );
};

export default NavBar;
