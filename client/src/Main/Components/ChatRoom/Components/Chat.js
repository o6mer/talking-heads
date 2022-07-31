import React, { useState, useEffect } from "react";
import ChatMsg from "./ChatMsg";
import Keyboard from "./Keyboard";

// import { socket } from "../../../MainPage.js";

import { io } from "socket.io-client";
const socket = io("http://localhost:8080");

const Chat = (props) => {
  const { roomId, chatArr } = props;

  const [messages, addMsg] = useState(chatArr); //keeping track on the messages
  const [val, setVal] = useState({});

  useEffect(() => {
    socket.on("receiveMsg", (msg) => {
      sendMessage(msg);
      console.log("I");
    });
  }, []);

  const postMsg = async (msg) => {
    const newMsg = {
      msgWriter: "p1",
      msgTime: "28:00",
      msgContent: msg,
    };
    let resData;
    try {
      const response = await fetch(`http://localhost:3001/api/room/${roomId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newMsg }),
      });
      resData = await response.json();
      sendMessage(resData); //updating the msg array in the front so the chat window will reRender
    } catch (error) {
      console.log(error);
    }
    socket.emit("getMsg", resData);
  };

  const sendMessage = (msg) => {
    //front arr
    const { msgWriter, msgContent, msgTime } = msg;
    addMsg((prev) => {
      return [...prev, { msgWriter, msgContent, msgTime }];
    });
    console.log(messages);
  };

  return (
    <section className="flex flex-col gap-5 w-full h-full p-3">
      {messages.map((element) => {
        // making ChatMsg components from the messages array
        return <ChatMsg msgObj={element} />;
      })}
      <Keyboard postMsg={postMsg} roomId={props.roomId} />
    </section>
  );
};

export default Chat;
