import React from "react";
import LabeledInput from "./Components/LabeledInput";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main className="flex justify-center items-center h-screen ">
      <form
        action=""
        className="flex flex-col gap-4 bg-gray-400 p-8 rounded-md"
      >
        <LabeledInput labelText="Email Address" type="email" />
        <LabeledInput labelText="Password" type="password" />
        <Link
          to="/main/1"
          className="bg-blue-700 text-white font-bold p-1 text-center "
        >
          Login
        </Link>
      </form>
    </main>
  );
};

export default LandingPage;
