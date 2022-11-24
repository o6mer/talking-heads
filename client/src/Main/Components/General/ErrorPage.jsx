import React, { useEffect } from "react";
import NavBar from "./NavBar";
import ErrorImage from "../../../Media/Moai404.jpg";
import { Link } from "react-router-dom";

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
        <Link to={`/main`}>Back to chat</Link>
        <Link to={`/`}>Back to home page</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
