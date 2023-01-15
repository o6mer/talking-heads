import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import LogoWhite from "../../../Media/talking_heads_logo_white_2.png";
import ClearIcon from "@mui/icons-material/Clear";

const MobileNav = () => {
  const [openNavDrawer, setOpenNavDrawer] = useState(false);

  return (
    <nav className="flex md:hidden">
      <button onClick={() => setOpenNavDrawer(true)}>
        <MenuIcon fontSize="large" />
      </button>

      <Drawer
        open={openNavDrawer}
        onClose={() => setOpenNavDrawer(false)}
        anchor="right"
      >
        <div className="flex flex-col gap-8 items-center h-full bg-thirdy py-4 px-2 text-white">
          <div className="flex w-full justify-between gap-12">
            <img src={LogoWhite} alt="Name logo" className="w-20" />
            <button onClick={() => setOpenNavDrawer(false)}>
              <ClearIcon />
            </button>
          </div>
          <div className="w-[90%] h-[1px] bg-slate-300 flex"> </div>
          <div className="flex flex-col gap-4">
            <a href="#home">Home</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#features">Features</a>
            <a href="#help">Help</a>

            <Link to="/signup">Signup</Link>
            <Link
              to="/login"
              className="text-black bg-[#c0f5b7] py-2 px-4 rounded-full hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-15px_rgba(0,0,0,0.4)] transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      </Drawer>
    </nav>
  );
};

export default MobileNav;
