import React from "react";
import NavBar from "./Components/General/NavBar";
import ErrorImage from "../Media/Moai404.jpg";

const ErrorPage = () => {
  return (
    <div>
      <NavBar isError={true} />
      <div className={"items-center flex flex-col"}>
        <img className={"h-screen"} src={ErrorImage} />
      </div>
    </div>
  );
};

export default ErrorPage;
