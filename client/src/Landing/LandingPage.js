import React from "react";
import NavBar from "./Components/General/NavBar";
import Features from "./Components/Home/Features";
import Hero from "./Components/Home/Hero";

const LandingPage = () => {
  // setPassword(e.target.value);

  return (
    <main className=" h-screen w-screen flex justify-center overflow-x-hidden">
      <div className="w-full max-w-5xl flex flex-col items-center gap-10">
        <NavBar />
        <Hero />
        <Features />
      </div>
    </main>
  );
};

export default LandingPage;
