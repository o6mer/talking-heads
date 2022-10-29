import { CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";

const ProtectedRoutes = () => {
  const { user } = useContext(UserContext);
  const [isLoggedUser, setIsLoggedUser] = useState(false);

  useEffect(() => {
    if (user) setIsLoggedUser(true);

    // return () => setIsLoggedUser(false);
  }, [user]);

  return isLoggedUser ? <Outlet /> : <LoadingPage />;
};

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <CircularProgress />
    </div>
  );
};

export default ProtectedRoutes;
