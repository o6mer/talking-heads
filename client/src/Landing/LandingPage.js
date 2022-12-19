import React from "react";
import NavBar from "./Components/General/NavBar";
import Features from "./Components/Home/Features";
import Hero from "./Components/Home/Hero";
import HowItWorks from "./Components/Home/HowItWorks";
import Fade from "react-reveal/Fade";
import Footer from "./Components/Home/Footer";
import MobileNav from "./Components/General/MobileNav";

const LandingPage = () => {
  // setPassword(e.target.value);

  return (
    <main className=" h-screen w-screen flex justify-center overflow-x-hidden scroll-smooth">
      <div className="w-full  flex flex-col items-center gap-20 ">
        <div
          className={`background-picture flex flex-col justify-center items-center bg-cover`}
        >
          <NavBar />
          <Hero />
        </div>
        <Fade bottom>
          <HowItWorks />
        </Fade>
        {/* <Fade bottom>
          <Features />
        </Fade> */}
        <Footer />
      </div>
    </main>
  );
};

export default LandingPage;
