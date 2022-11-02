import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Features = () => {
  return (
    <section
      className="w-full max-w-5xl flex justify-between align-center gap-4"
      id="features"
    >
      <FeatureCard
        logo={<AccountCircleIcon fontSize="large" />}
        header={"Card Header"}
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt amet eligendi itaque consectetur, expedita iure reprehenderit voluptas aliquam cupiditate vero!"
      />
      <FeatureCard
        logo={<AccountCircleIcon fontSize="large" />}
        header={"Card Header"}
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt amet eligendi itaque consectetur, expedita iure reprehenderit voluptas aliquam cupiditate vero!"
      />
      <FeatureCard
        logo={<AccountCircleIcon fontSize="large" />}
        header={"Card Header"}
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt amet eligendi itaque consectetur, expedita iure reprehenderit voluptas aliquam cupiditate vero!"
      />
    </section>
  );
};

const FeatureCard = ({ logo, header, content }) => {
  return (
    <div className="w-full flex flex-col shadow-lg p-7 rounded-md gap-1 hover:scale-105 transition-all">
      <div className="w-full">{logo}</div>
      <header className="text-xl">{header}</header>
      <p className="text-gray-600 mt-2">{content}</p>
    </div>
  );
};

export default Features;
