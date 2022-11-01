import React from "react";
import NavBar from "./Components/General/NavBar";
import Features from "./Components/Home/Features";
import Hero from "./Components/Home/Hero";
import HowItWorks from "./Components/Home/HowItWorks";
import Background from "../Media/bg_hero.png";

const LandingPage = () => {
  // setPassword(e.target.value);

  return (
    <main className=" h-screen w-screen flex justify-center overflow-x-hidden scroll-smooth">
      <div className="w-full  flex flex-col items-center gap-10 ">
        <div className={`hero-picture flex flex-col justify-center items-center`}>
          <NavBar />
          <Hero />
        </div>
        <HowItWorks />
        <Features />
      </div>
    </main>
  );
};

export default LandingPage;
