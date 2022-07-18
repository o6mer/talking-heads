import React, { useState, useEffect } from "react";
import ChatMsg from "./ChatMsg";
import Keyboard from "./Keyboard";

const Chat = (props) => {
  const initialMessages = props.chatArr;

  const [messages, addMsg] = useState(initialMessages); //keeping track on the messages

  const sendMessage = ({ msgWriter = "guest", msgContent, msgTime }) => {
    addMsg((prev) => {
      return [...prev, { msgWriter, msgContent, msgTime }];
    });
  };

  return (
    <section className="flex flex-col gap-5 w-full h-full p-3">
      {messages.map((element) => {
        // making ChatMsg components from the messages array
        return <ChatMsg msgObj={element} />;
      })}
      <Keyboard sendMsg={sendMessage} roomId={props.roomId} />
    </section>
  );
};

export default Chat;
