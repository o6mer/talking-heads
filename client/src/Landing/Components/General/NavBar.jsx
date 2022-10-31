import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../Media/NameChatLogo4.png";

const NavBar = () => {
  const linkStyles =
    "transition-all hover:-translate-y-0.5 hover:bg-slate-100 p-2 rounded-full hover:shadow-[0_10px_25px_-15px_rgba(0,0,0,0.4)]";

  return (
    <nav className="flex items-center justify-between py-2 text-l w-full">
      <Link
        to="/"
        className="flex items-center justify-center gap-1 text-black font-bold py-2 transition-all"
      >
        <img src={Logo} alt="Name logo" className="w-12" />
        <p className="text-black"> Name Chat </p>
      </Link>
      <div className="flex gap-5 items-center h-full">
        <Link to="/" className={linkStyles}>
          Home
        </Link>
        <Link to="/" className={linkStyles}>
          About
        </Link>
        <Link to="/" className={linkStyles}>
          Contact
        </Link>
        <Link to="/" className={linkStyles}>
          Help
        </Link>

        <div className="w-[1px] h-[60%] bg-slate-300"> </div>

        <Link to="/signup" className={linkStyles}>
          Signup
        </Link>
        <Link
          to="/login"
          className="text-white bg-thirdy py-2 px-4 rounded-full hover:bg-fourthy hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-15px_rgba(0,0,0,0.4)] transition-all"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
