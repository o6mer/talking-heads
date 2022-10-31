import React from "react";
import NavBar from "./Components/General/NavBar";
import LoginPage from "./Components/Login/LoginPage";
import Hero from "./Components/Sections/Hero";

const LandingPage = () => {
  // setPassword(e.target.value);

  return (
    <main className=" h-screen w-screen flex justify-center">
      <div className="w-full max-w-5xl flex flex-col items-center gap-10">
        <NavBar />
        <Hero />
      </div>
    </main>
  );
};

export default LandingPage;
