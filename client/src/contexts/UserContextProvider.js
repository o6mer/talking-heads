import React, { createContext, useState } from "react";

export const UserContext = createContext({});

const UserPorivder = ({ children }) => {
  const [user, setUser] = useState({});
  const [currentRoom, setCurrentRoom] = useState("");

  return (
    <UserContext.Provider
      value={{ user, setUser, currentRoom, setCurrentRoom }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserPorivder;
