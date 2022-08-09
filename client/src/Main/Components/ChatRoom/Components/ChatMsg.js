import React, { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContextProvider";

const ChatMsg = ({ msgWriter, msgContent, msgTime }) => {
  const currentUserId = useContext(UserContext).user.userId;

  return (
    <div
      className={`flex max-w-max p-3  gap-3 text-xl font-bold justify-around border-2 border-black border-solid> ${
        currentUserId === msgWriter && "self-end bg-green-300"
      }`}
    >
      <p>{msgWriter ?? "p1"}</p>
      <p>{msgContent ?? "erorr"}</p>
      <p>{msgTime ?? "00:00:00"}</p>
    </div>
  );
};

export default ChatMsg;
