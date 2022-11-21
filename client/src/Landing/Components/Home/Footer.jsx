import React from "react";
import HeroPicture from "../../../Media/talking_heads_logo1.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer className="flex w-full bg-thirdy justify-center py-14">
      <div className="w-full max-w-5xl flex justify-between text-white">
        <section className="flex flex-col justify-start">
          <img src={HeroPicture} alt="logo" className="w-32" />
          <div className="w-full text-white flex justify-between ">
            <a
              href="https://github.com/o6mer/music-chat-app"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-[#ccc]"
            >
              <GitHubIcon fontSize="medium" />
            </a>
            <a href="#" target="_blank" rel="noreferrer noopener" className="hover:text-[#ccc]">
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
        <section>section1</section>
        <section>section2</section>
        <section>section3</section>
      </div>
    </footer>
  );
};

export default Footer;
