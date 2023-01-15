import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContextProvider";

export default function useAuth() {
  // const [accessToken, setAccessToken] = useState(currentAccessToken);
  const [spotifyCode, setSpotifyCode] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const { accessToken, setAccessToken } = useContext(UserContext);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("spotifyAccessToken"));

    const currentTime = new Date(new Date().getTime());
    const storedTime = new Date(storedData?.expiresIn);

    if (!storedData || storedTime < currentTime) {
      setAccessToken(null);
      setExpiresIn(null);
      setSpotifyCode(new URLSearchParams(window.location.search).get("code"));
      return () => localStorage.removeItem("spotifyAccessToken");
    }

    setAccessToken(storedData.accessToken);
    setExpiresIn(storedData.expiresIn);

    return () => localStorage.removeItem("spotifyAccessToken");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    localStorage.setItem(
      "spotifyAccessToken",
      JSON.stringify({
        accessToken,
        expiresIn,
      })
    );
  }, [accessToken, expiresIn]);

  useEffect(() => {
    // if (!refreshToken || !expiresIn || !accessToken) return;

    if (!spotifyCode) return;

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/spotify/login`, {
        code: spotifyCode,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/main/1");
      })
      .catch((err) => {
        if (err.response.status === 405) {
          const { data } = err.response;
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          setExpiresIn(data.expiresIn);
        } else {
          console.log(err);
        }
      });
  }, [spotifyCode, setAccessToken]);

  useEffect(() => {
    if (!refreshToken || !expiresIn || accessToken) return;
    const interval = setInterval(() => {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/spotify/refresh`, {
          refreshToken,
        })
        .then((res) => {
          if (!res.ok) console.log(res);
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch((err) => {
          console.log(err);
        });
    }, (expiresIn - 60) * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken, expiresIn]);

  return accessToken;
}
