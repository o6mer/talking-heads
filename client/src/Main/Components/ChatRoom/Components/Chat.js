import React, { useState } from "react";
import ChatMsg from "./ChatMsg";

const Chat = () => {
  const DUMMY_MASSAGES = [
    { msgWriter: "p1", msgContent: "test massage", msgTime: "00:00" },
    { msgWriter: "p2", msgContent: "test massage", msgTime: "00:00" },
    { msgWriter: "p3", msgContent: "test massage", msgTime: "00:00" },
    { msgWriter: "p4", msgContent: "test massage", msgTime: "00:00" },
  ];

  return (
    <section className="flex flex-col gap-5 w-full h-full p-3">
      {DUMMY_MASSAGES.map((msg) => {
        return <ChatMsg {...msg} />;
      })}
      {/* <ChatMsg {...DUMMY_MASSAGES[0]} /> */}
    </section>
  );
};

export default Chat;
