import React, { createContext, useState } from "react";

export const UserContext = createContext({});

const UserPorivder = ({ children }) => {
  const [user, setUser] = useState();
  const [currentRoomId, setCurrentRoomId] = useState(undefined);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        currentRoomId,
        setCurrentRoomId,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserPorivder;
