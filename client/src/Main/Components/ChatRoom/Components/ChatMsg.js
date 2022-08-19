import React, { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContextProvider";

const ChatMsg = ({ msgWriter, msgContent, msgTime }) => {
  const { user } = useContext(UserContext);

  return (
    <div
      className={`flex max-w-max p-3  gap-3 text-xl font-bold justify-around border-2 border-black border-solid> ${
        user.user.userName === msgWriter ? "self-end bg-blue-300" : ""
      }`}
    >
      <p>{msgWriter}</p>
      <p>{msgContent}</p>
      <p>{msgTime}</p>
    </div>
  );
};

export default ChatMsg;
