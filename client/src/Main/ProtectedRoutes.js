import { CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";
import useAuth from "../Landing/hooks/useAuth";

const ProtectedRoutes = () => {
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  const { user } = useContext(UserContext);
  const { relogin } = useAuth();

  useEffect(() => {
    if (user) return setIsLoggedUser(true);
    relogin();
    // return () => setIsLoggedUser(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return isLoggedUser ? <Outlet /> : <LoadingPage />;
};

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <CircularProgress />
    </div>
  );
};

export default ProtectedRoutes;
