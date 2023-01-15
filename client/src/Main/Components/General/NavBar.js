import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Tooltip } from "@mui/material";
import Logo from "../../../Media/talking_heads_logo_white_2.png";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import { UserContext } from "../../../contexts/UserContextProvider";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import MusicMenu from "./MusicMenu/MusicMenu";
import { useRef } from "react";

const NavBar = () => {
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElMusic, setAnchorElMusic] = useState(null);
  const { darkMode, accessToken } = useContext(UserContext);
  const musicRef = useRef();

  const openMenuProfile = Boolean(anchorElProfile);
  const openMenuMusic = Boolean(anchorElMusic);

  return (
    <nav
      className={`w-full flex items-center shadow-md border-b-black border-solid px-6 py-2 text-3xl  z-10 ${
        darkMode ? "bg-fourthy" : "bg-thirdy"
      } `}
    >
      <Link to="/main">
        <span className="flex items-center justify-center gap-2 text-white font-bold">
          <img src={Logo} alt="Name logo" className="w-24" />
          {/* <p className=""> Name Chat </p> */}
        </span>
      </Link>
      <div className="flex justify-center items-center ml-auto gap-4">
        <div ref={musicRef}>
          {accessToken ? (
            <Tooltip
              title="Play Music"
              className="text-white hover:text-gray-200"
            >
              <button
                className={`text-[#1DB954] hover:text-[#1a9c47] flex items-center justify-center `}
                onClick={(e) => {
                  setAnchorElMusic(e.currentTarget);
                }}
                id="music-button"
                aria-controls={openMenuMusic ? "music-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenuMusic ? "true" : undefined}
              >
                <HeadphonesIcon fontSize="large" />
              </button>
            </Tooltip>
          ) : (
            <Tooltip
              title="Login To Spotify"
              className="text-white hover:text-gray-200"
            >
              <a
                href={`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URL}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`}
                className="flex items-center justify-center"
              >
                <HeadphonesIcon fontSize="large" />
              </a>
            </Tooltip>
          )}
        </div>

        <Tooltip title="Your Profile">
          <button
            className={`flex  items-center w-min text-white hover:text-gray-200 `}
            onClick={(e) => {
              setAnchorElProfile(e.currentTarget);
            }}
            id="profile-button"
            aria-controls={openMenuProfile ? "profile-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenuProfile ? "true" : undefined}
          >
            <AccountCircleIcon sx={{ color: "inherit" }} fontSize="large" />
            <ArrowDropDownIcon sx={{ color: "inherit" }} />
          </button>
        </Tooltip>
        <ProfileMenu
          setAnchorEl={setAnchorElProfile}
          anchorEl={anchorElProfile}
          openMenu={openMenuProfile}
        />
        <MusicMenu
          setAnchorEl={setAnchorElMusic}
          anchorEl={anchorElMusic}
          openMenu={openMenuMusic}
          musicRef={musicRef}
        />
      </div>
    </nav>
  );
};

export default NavBar;
