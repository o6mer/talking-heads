import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    // if (!refreshToken || !expiresIn || !accessToken) return;
    if (!code) return;

    axios
      .post("http://localhost:3001/api/spotify/login", {
        code,
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
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn || accessToken) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/api/spotify/refresh", {
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
  }, [refreshToken, expiresIn]);

  return accessToken;
}
