import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContextProvider";
let logoutTimer;

const useAuth = () => {
  const { setUser } = useContext(UserContext);
  const [tokenExpoDate, setTokenExpoDate] = useState();

  const navigate = useNavigate();

  const login = useCallback(
    (user, tokenExpoDate = new Date(new Date().getTime() + 3600000)) => {
      setUser(user);
      setTokenExpoDate(tokenExpoDate);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...user,
          expiration: tokenExpoDate.toISOString(),
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setTokenExpoDate(null);
    setUser(null);
    localStorage.removeItem("userData");
    navigate("/");
  }, []);

  useEffect(() => {
    if (tokenExpoDate) {
      const remainingTime = tokenExpoDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, tokenExpoDate]);

  const relogin = useCallback(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData) {
      login(storedData, new Date(storedData.expiration));
    }
  }, []);

  useEffect(() => {
    relogin();
  }, []);

  return { login, logout, relogin };
};

export default useAuth;
