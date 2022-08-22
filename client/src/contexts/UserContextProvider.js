import React, { createContext, useState } from "react";

export const UserContext = createContext({});

const UserPorivder = ({ children }) => {
  const [user, setUser] = useState({
    userName: "notLoggedIn",
    email: "unLog@gmail.com",
    password: "12345678",
    profilePictureUrl: "C:",
  });
  const [currentRoomId, setCurrentRoomId] = useState("");

  return (
    <UserContext.Provider
      value={{ user, setUser, currentRoom, setCurrentRoom }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserPorivder;
