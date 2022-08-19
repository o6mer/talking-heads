import React, { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContextProvider";

import Link from "@mui/material/Link";

const ChatMsg = ({ msgWriter, msgContent, msgTime }) => {
  const { user } = useContext(UserContext);
  const loggedUserName = user.userName;
  const isLoggedInUser = loggedUserName === msgWriter;
  console.log("logged in? " + isLoggedInUser);

  return (
    <div
      className={`max-w-max p-3 gap-3 font-bold justify-around border-2 border-black border-solid rounded-md ${
        isLoggedInUser ? "self-end bg-green-300" : "bg-gray-300"
      }`}
    >
      <div>
        <Link
          // className={`${isLoggedInUser ? "text-gray-300" : "text-blue-500"}`}
          href="#"
          color="primary"
        >
          {msgWriter}
        </Link>
      </div>

      <div className="flex gap-4 text-xl">
        <p>{msgContent}</p>
      </div>

      <div>
        <p className="text-sm text-right">{msgTime}</p>
      </div>
    </div>
  );
};

export default ChatMsg;
