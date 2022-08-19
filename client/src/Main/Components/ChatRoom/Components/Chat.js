import React, { useState, useEffect, useContext } from "react";
import ChatMsg from "./ChatMsg";
import Keyboard from "./Keyboard";
import { UserContext } from "../../../../contexts/UserContextProvider";
import { socket } from "../../../MainPage";

const Chat = (props) => {
  const { roomId, msgsArr } = props;
  const [messages, setMsg] = useState(msgsArr); //keeping track on the messages
  const { user, currentRoomId } = useContext(UserContext);
  useEffect(() => {
    socket.on("receiveMsg", (msg) => {
      sendMessage(msg);
    });
  }, []);

  //post a message to the backend
  const postMsg = async (msgContent) => {
    const newMsg = {
      msgWriter: user.user.userName,
      msgTime: new Date(),
      msgContent,
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

  //send a message in the frontend
  const sendMessage = (msg) => {
    //front arr
    const { msgWriter, msgContent, msgTime } = msg;
    setMsg((prev) => {
      return [...prev, { msgWriter, msgContent, msgTime }];
    });
  };

  const deleteAllMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/room/deletMessages/${roomId}`
      );
      window.location.reload(false);
      setMsg([]);
      console.log("reload");
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
