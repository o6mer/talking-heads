import React, { createContext, useState } from "react";

export const UserContext = createContext({});

const UserPorivder = ({ children }) => {
  const [user, setUser] = useState({
    _id: "noId12345678",
    userName: "notLoggedIn",
    email: "unLog@gmail.com",
    password: "12345678",
    profilePictureUrl: "C:",
  });
  const [currentRoomId, setCurrentRoomId] = useState(undefined);

  return (
    <UserContext.Provider
      value={{ user, setUser, currentRoomId, setCurrentRoomId }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserPorivder;
