import { CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";
import useAuth from "../Landing/hooks/useAuth";

const MainPageProtected = ({ children }) => {
  const [isLoggedCorrectly, setIsLoggedCorrectly] = useState(false);
  const { user } = useContext(UserContext);
  useAuth();

  useEffect(() => {
    console.log(user);
    if (!user) return;

    setIsLoggedCorrectly(true);
  }, [user]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {isLoggedCorrectly ? children : <LoadingPage />}
    </div>
  );
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
    <div>
      <CircularProgress />
    </div>
  );
};

export default MainPageProtected;
