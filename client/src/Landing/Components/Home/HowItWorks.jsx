import React from "react";
import HeroPicture from "../../../Media/NameChatLogo4.png";

const HowItWorks = () => {
  return (
    <section className="w-full max-w-5xl flex flex-col justify-center items-center gap-10" id="how-it-works">
      <header className="text-4xl font-bold">Chat with everyone in 3 easy steps</header>
      <HowItWorksItem
        number="01"
        header="Lorem ipsum dolor sit amet consectetur."
        content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione, distinctio nostrum quos repellendus accusamus soluta cumque fugiat eveniet inventore ex!"
        image={HeroPicture}
        side="left"
      />
      <HowItWorksItem
        number="02"
        header="Lorem ipsum dolor sit amet consectetur."
        content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione, distinctio nostrum quos repellendus accusamus soluta cumque fugiat eveniet inventore ex!"
        image={HeroPicture}
        side="right"
      />
      <HowItWorksItem
        number="03"
        header="Lorem ipsum dolor sit amet consectetur."
        content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione, distinctio nostrum quos repellendus accusamus soluta cumque fugiat eveniet inventore ex!"
        image={HeroPicture}
        side="left"
      />
    </section>
  );
};

const HowItWorksItem = ({ number, header, content, image, side }) => {
  return (
    <>
      {side === "left" ? (
        <div className="flex gap-5 justify-center items-center">
          <div className="flex flex-col gap-3">
            <p className="text-7xl font-bold text-neutral-400 ">{number}</p>
            <h2 className="text-3xl font-bold mb-4">{header}</h2>
            <p className="text-xl font-extralight">{content}</p>
          </div>
          <img src={image} alt="" width="400px" loading=" lazy" />
        </div>
      ) : (
        <div className="flex gap-5 justify-center items-center">
          <img src={image} alt="" width="400px" loading=" lazy" />

          <div className="flex flex-col gap-3">
            <p className="text-7xl font-bold text-neutral-400 ">{number}</p>
            <h2 className="text-3xl font-bold mb-4">{header}</h2>
            <p className="text-xl font-extralight">{content}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default HowItWorks;
