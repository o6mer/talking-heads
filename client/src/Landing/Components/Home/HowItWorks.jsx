import React from "react";
import HeroPicture from "../../../Media/NameChatLogo4.png";
import SignupImage from "./HomePageImages/SignupImage.PNG";
import Fade from "react-reveal/Fade";

const HowItWorks = () => {
  return (
    <section
      className="w-full flex flex-col justify-center items-center gap-6"
      id="how-it-works"
    >
      <header className="text-4xl font-bold px-6">
        Chat with everyone in 3 easy steps
      </header>
      <div className="flex flex-col ">
        <Fade bottom>
          <HowItWorksItem
            number="01"
            header="Create an account or sign in to an exisisting one"
            content="Create an account, choose your user name, put in your email and password. After signining in you will be able to choose your profile picture."
            image={SignupImage}
            side="left"
          />
        </Fade>
        <Fade bottom>
          <HowItWorksItem
            number="02"
            header="Join a chat room or create you own"
            content="Choose a chat room of your liking or create a completly new one. Every room is created by the community and the creator can choose the name, the room image and the maximum amount of people who can join."
            image={HeroPicture}
            side="right"
            dark={true}
          />
        </Fade>
        <Fade bottom>
          <HowItWorksItem
            number="03"
            header="Start Chatting!"
            content="Once in a room you will see all the previous messages that have been sent in the chat and ofcourse send your own messages. Also you can see who is currently in the room and their profile."
            image={HeroPicture}
            side="left"
          />
        </Fade>
      </div>
    </section>
  );
};

const HowItWorksItem = ({ number, header, content, image, side, dark }) => {
  return (
    <div
      className={`flex flex-col w-screen gap-10 justify-center items-center ${
        dark && "bg-gray-100"
      }`}
    >
      <div
        className={`max-w-5xl px-6 md:px-0 py-16 flex gap-10 justify-center items-center flex-col ${
          side === "left" ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        <div className="flex flex-col gap-3">
          <p className="text-5xl md:text-7xl font-bold text-neutral-400 ">
            {number}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{header}</h2>
          <p className="text-lg md:text-xl font-extralight">{content}</p>
        </div>
        <img
          src={image}
          className="rounded-md shadow-xl"
          alt=""
          width="400px"
          loading=" lazy"
        />
      </div>
    </div>
  );
};

export default HowItWorks;
