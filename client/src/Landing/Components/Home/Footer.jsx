import React from "react";
import HeroPicture from "../../../Media/talking_heads_logo1.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex w-full bg-thirdy justify-center items-center py-14">
      <div className="w-full max-w-5xl grid grid-cols-2 grid-rows-3 gap-4 md:gap-0 md:flex justify-between items-center text-white px-6 md:px-0 ">
        <section className="flex flex-col justify-start row-span-1 col-span-full self-center justify-self-center">
          <a href="#home" className="transition-all hover:underline">
            <img src={HeroPicture} alt="logo" className="w-32" />
          </a>
          <div className="w-full text-white flex gap-6 ">
            <a
              href="https://github.com/o6mer/music-chat-app"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-[#ccc]"
            >
              <GitHubIcon fontSize="medium" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-[#ccc]"
            >
              <FacebookIcon fontSize="medium" />
            </a>
            <a
              href="https://www.linkedin.com/in/omer-liraz-12a337230/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-[#ccc]"
            >
              <LinkedInIcon fontSize="medium" />
            </a>
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <p className="text-lg text-primary">General</p>
          <ul className="flex flex-col gap-1">
            <li>
              <Link to="/" className="transition-all hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/" className="transition-all hover:underline">
                Help
              </Link>
            </li>
            <li>
              <Link to="/" className="transition-all hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-2 justify-self-end">
          <p className="text-lg text-primary">Users</p>
          <ul className="flex flex-col gap-1">
            <li>
              <Link to="/login" className="transition-all hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="transition-all hover:underline">
                Signup
              </Link>
            </li>
            <li>
              <Link
                to="/forgotPassword"
                className="transition-all hover:underline"
              >
                Forgot Password
              </Link>
            </li>
          </ul>
        </section>
        <section className="flex flex-col gap-2">
          <p className="text-lg text-primary">Navigation</p>
          <ul className="flex flex-col gap-1">
            <li>
              <a href="#home" className="transition-all hover:underline">
                Home
              </a>
            </li>
            <li>
              {" "}
              <a
                href="#how-it-works"
                className="transition-all hover:underline"
              >
                How It Works
              </a>
            </li>
            <li>
              <a href="#features" className="transition-all hover:underline">
                Features
              </a>
            </li>
            <li>
              <a href="#help" className="transition-all hover:underline">
                Help
              </a>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
