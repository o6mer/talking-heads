import React from "react";
import HeroPicture from "../../../Media/NameChatLogo4.png";

const Hero = () => {
  return (
    <section className="w-full">
      <div className="w-full flex items-center justify-evenly">
        <div className="flex flex-col gap-4">
          <header className="text-5xl font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </header>
          <p className="text-2xl font-extralight text-gray-500 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            error nobis ducimus, temporibus laboriosam neque labore illo
            quisquam, totam, odit deleniti!
          </p>
        </div>
        <img src={HeroPicture} alt="hero pic" className="w-full max-w-3xl" />
      </div>
    </section>
  );
};

export default Hero;
