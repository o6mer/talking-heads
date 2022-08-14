import React, { useState, useEffect, useContext } from "react";
import ChatMsg from "./ChatMsg";
import Keyboard from "./Keyboard";
import { UserContext } from "../../../../contexts/UserContextProvider";
import { socket } from "../../../MainPage";

const Chat = (props) => {
  const { roomId, chatArr } = props;
  const [messages, addMsg] = useState(chatArr); //keeping track on the messages
  const { userId, currentRoomId } = useContext(UserContext);

  useEffect(() => {
    socket.on("receiveMsg", (msg) => {
      sendMessage(msg);
    });
  }, []);

  const postMsg = async (msg) => {
    const newMsg = {
      msgWriter: userId,
      msgTime: new Date(),
      msgContent: msg,
    };
    try {
      const response = await fetch(`http://localhost:3001/api/room/${roomId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newMsg }),
      });
      const resData = await response.json();
      sendMessage(resData); //updating the msg array in the front so the chat window will reRender
    } catch (error) {
      console.log(error);
    }
    if (!socket) return;
    socket.emit("getMsg", newMsg, currentRoomId);
  };

  const sendMessage = (msg) => {
    //front arr
    const { msgWriter, msgContent, msgTime } = msg;
    addMsg((prev) => {
      return [...prev, { msgWriter, msgContent, msgTime }];
    });
  };

  const deleteAllMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/room/deletMessages/${roomId}`
      );
      const resData = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col gap-5 h-full w-full p-3">
      <div className="flex flex-col gap-1 max-h-full overflow-y-scroll ">
        {messages.map((element) => {
          // making ChatMsg components from the messages array
          return <ChatMsg {...element} />;
        })}
      </div>

      <Keyboard
        postMsg={postMsg}
        roomId={props.roomId}
        deleteAllMessages={deleteAllMessages}
      />
    </section>
  );
};

export default Chat;
