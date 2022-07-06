import React from "react";

const ChatMsg = ({
  msgWriter = "p",
  msgContent = "massage content",
  msgTime = "00:00",
}) => {
  return (
    <div
      className={`flex max-w-max p-3  gap-3 text-xl font-bold justify-around border-2 border-black border-solid> ${
        msgWriter === "p1" && "self-end bg-green-300"
      }`}
    >
      <p>{msgWriter}</p>
      <p>{msgContent}</p>
      <p>{msgTime}</p>
    </div>
  );
};

export default ChatMsg;
