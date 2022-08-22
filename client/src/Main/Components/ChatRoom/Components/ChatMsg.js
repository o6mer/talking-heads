import React, { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContextProvider";

import Link from "@mui/material/Link";

const ChatMsg = ({ msgWriter, msgContent, msgTime }) => {
  const { user } = useContext(UserContext);
  const loggedUserName = user.userName;
  const isLoggedInUser = loggedUserName === msgWriter; //boolean value represents if the message is written by the logged in user

  return (
    <div
      className={`max-w-max p-3 gap-3 font-bold justify-around border-2 border-black border-solid rounded-md ${
        isLoggedInUser ? "self-end bg-blue-200" : "bg-gray-400"
      }`}
    >
      <div>
        <Link href="#">{msgWriter}</Link>
      </div>

      <div
        className={`flex gap-4 text-xl ${
          isLoggedInUser ? "text-black" : "text-white"
        }`}
      >
        <p>{msgContent}</p>
      </div>

      <div>
        <p className="text-sm text-right">{msgTime}</p>
      </div>
    </div>
  );
};

export default ChatMsg;
