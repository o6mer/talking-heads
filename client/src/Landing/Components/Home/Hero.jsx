import React from "react";
import { Link } from "react-router-dom";
import HeroPicture from "../../../Media/talking_heads_logo1.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const Hero = () => {
  return (
    <section
      className="w-screen flex flex-col justify-center items-center pb-16"
      id="home"
    >
      <img src={HeroPicture} alt="hero pic" className="w-[500px]" />

      <div className="w-full flex items-center justify-center max-w-5xl flex-col gap-5 px-6">
        <header className="text-5xl font-bold text-white uppercase text-center">
          Chat with everyone at any time
        </header>
        <p className="text-2xl font-extralight text-gray-300  text-center">
          An online, real time, chatting application. Chat with people with an
          easy to use interface, costumisable chat rooms and cool features like
          listening to music while chatting.
        </p>
        <div className="flex w-full justify-center items-center gap-5 text-white">
          <Link
            to="/signup"
            className="w-52 bg-[#c0f5b7] text-center inline-block py-2 px-4 text-l rounded-full font-bold  hover:-translate-y-0.5 transition-all hover:shadow-[0_10px_25px_-15px_rgba(0,0,0,0.4)] text-black "
          >
            <span>
              Start chatting
              <ArrowForwardIcon />
            </span>
          </Link>
          <Link
            to="/login"
            className="w-52 text-center hover:bg-[#c0f5b7] hover hover:text-black hover:-translate-y-0.5 border-2 hover:shadow-[0_10px_25px_-15px_rgba(0,0,0,0.4)] border-[#c0f5b7] border-style inline-block py-2 px-4 text-l rounded-full font-bold  transition-all"
          >
            Login for users
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
