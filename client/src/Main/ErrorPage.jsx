import React, { useEffect } from "react";
import NavBar from "./Components/General/NavBar";
import ErrorImage from "../Main/Media/Moai404.jpg";

const ErrorPage = () => {
  useEffect(() => {
    console.error("Status code: 404. Page not found");
  }, []);
  return (
    <div>
      <NavBar isError={true} />
      <div className={"items-center flex flex-col mt-20"}>
        <p>Page not found</p>
        <img className={"w-96"} src={ErrorImage} />
      </div>
    </div>
  );
};

export default ErrorPage;
