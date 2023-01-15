import React, { createContext, useState } from "react";
import { io } from "socket.io-client";

export const UserContext = createContext({});

const UserPorivder = ({ children }) => {
  const [user, setUser] = useState();
  const [currentRoomId, setCurrentRoomId] = useState(undefined);
  const [darkMode, setDarkMode] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [socket] = useState(
    io(process.env.REACT_APP_API_URL, {
      "sync disconnect on unload": true,
      closeOnBeforeunload: false,
    })
  );

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        currentRoomId,
        setCurrentRoomId,
        darkMode,
        setDarkMode,
        accessToken,
        setAccessToken,
        socket,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserPorivder;
