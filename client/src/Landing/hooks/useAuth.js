import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContextProvider";
import { socket } from "../../Main/MainPage";

let logoutTimer;

const useAuth = () => {
  const { setUser, user, currentRoomId, setCurrentRoomId } = useContext(UserContext);
  const [tokenExpoDate, setTokenExpoDate] = useState();

  const navigate = useNavigate();

  const login = useCallback((user, tokenExpoDate = new Date(new Date().getTime() + 3600000)) => {
    setUser(user);
    setTokenExpoDate(tokenExpoDate);

    localStorage.setItem(
      "userId",
      JSON.stringify({
        userId: user._id,
        expiration: tokenExpoDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("userId");
    socket.emit("userDisconnected", user._id, currentRoomId);
    setTokenExpoDate(null);
    setUser(null);
    setCurrentRoomId(null);
    navigate("/login");
  }, [currentRoomId]);

  useEffect(() => {
    if (tokenExpoDate) {
      const remainingTime = tokenExpoDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, tokenExpoDate]);

  const relogin = useCallback(async () => {
    const storedData = JSON.parse(localStorage.getItem("userId"));

    if (!storedData) return;

    const req = await fetch(`http://localhost:3001/api/user/${storedData?.userId}`);
    const user = await req.json();
    if (user) {
      login(user, new Date(storedData.expiration));
    }
  }, []);

  useEffect(() => {
    relogin();
  }, []);

  return { login, logout, relogin };
};

export default useAuth;
