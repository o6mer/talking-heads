import React, { createContext, useState } from "react";

export const UserContext = createContext({});

const UserPorivder = ({ children }) => {
  const [user, setUser] = useState({});
  const [currentRoomId, setCurrentRoomId] = useState("");

  return (
    <UserContext.Provider
      value={{ user, setUser, currentRoomId, setCurrentRoomId }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserPorivder;
