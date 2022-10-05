import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContextProvider";

let logoutTimer;

const useAuth = () => {
  const { setUser } = useContext(UserContext);
  const [tokenExpoDate, setTokenExpoDate] = useState();

  const login = useCallback((user) => {
    setUser(user);
    const tokenExpoDate = new Date(new Date().getTime() + 1000 * 3600);
    setTokenExpoDate(tokenExpoDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...user,
        expiration: tokenExpoDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setTokenExpoDate(null);
    setUser(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (tokenExpoDate) {
      const remainingTime = tokenExpoDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, tokenExpoDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    console.log(storedData);
    if (storedData) {
      login(storedData, new Date(storedData.expiration));
    }
  }, []);

  return { login, logout };
};

export default useAuth;
