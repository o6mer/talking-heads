import React, { useEffect } from "react";
import NavBar from "./Components/General/NavBar";
import ErrorImage from "../Media/Moai404.jpg";

const ErrorPage = () => {
  useEffect(() => {
    console.error("Status code: 404. Page not found");
  }, []);
  return (
    <div className={"items-center flex flex-col justify-center w-full h-full"}>
      <p>Page not found</p>
      <img className={"w-96"} alt="page not found" src={ErrorImage} />
    </div>
  );
};

export default ErrorPage;
