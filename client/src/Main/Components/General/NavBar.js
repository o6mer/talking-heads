import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Tooltip } from "@mui/material";
import Logo from "../../Media/NameChatLogo4.png";
import ProfileMenu from "./MyProfileMenu/ProfileMenu";
import { UserContext } from "../../../contexts/UserContextProvider";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { darkMode } = useContext(UserContext);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const opemMenu = Boolean(anchorEl);

  return (
    <nav
      className={`w-full h-13 flex items-center shadow-md border-b-black border-solid px-6 py-2 text-3xl ${
        darkMode ? "bg-[#090909]" : "bg-thirdy"
      } `}
    >
      <Link to="/">
        <span className="flex items-center justify-center gap-2 text-white font-bold">
          <img src={Logo} alt="Name logo" className="w-12" />
          <p className=""> Name Chat </p>
        </span>
      </Link>
      <div className="flex ml-auto gap-4">
        <Tooltip title="Your Profile">
          <button
            className="flex  items-center w-min text-white hover:text-gray-200"
            onClick={handleClickMenu}
            id="profile-button"
            aria-controls={opemMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={opemMenu ? "true" : undefined}
          >
            <AccountCircleIcon sx={{ color: "inherit" }} fontSize="large" />
            <ArrowDropDownIcon sx={{ color: "inherit" }} />
          </button>
        </Tooltip>
        <ProfileMenu
          setAnchorEl={setAnchorEl}
          anchorEl={anchorEl}
          opemMenu={opemMenu}
        />
      </div>
    </nav>
  );
};

export default NavBar;
