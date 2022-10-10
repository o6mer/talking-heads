import React, { useState, useEffect, useContext } from "react";
import ChatMsg from "./ChatMsg";
import Keyboard from "./Keyboard";
import { UserContext } from "../../../../contexts/UserContextProvider";
import { socket } from "../../../MainPage";
import SpotifyAuth from "../../SpotifyApi/SpotifyAuth";
import Dashboard from "../../SpotifyApi/Dashboard";

const code = new URLSearchParams(window.location.search).get("code");

const Chat = (props) => {
  const { roomId, msgsArr } = props;
  const [messages, setMsg] = useState(msgsArr); //keeping track on the messages
  const { user, currentRoomId } = useContext(UserContext);

  console.log(msgsArr);

  useEffect(() => {
    socket.on("receiveMsg", (msg) => {
      addMessage(msg);
    });
  }, []);

  const delMsg = async (msgId, userInfo, msgWriter) => {
    console.log(userInfo);
    try {
      console.log(msgId, roomId);
      const response = await fetch(
        `http://localhost:3001/api/room/deleteOneMsg/${roomId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ msgId, userInfo, msgWriter }),
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //post a message to the backend
  const sendMessage = async (msgContent) => {
    if (!socket) return;
    const time = new Date();
    const newMsg = {
      msgWriter: user,

      msgTime: `${time.getHours()}:${time.getMinutes()}`,
      msgContent,
    };

    socket.emit("sendMsg", newMsg, currentRoomId, (msgId) => {
      newMsg.msgId = msgId;
      addMessage(newMsg);
      console.log(newMsg);
    });
  };

  //send a message in the frontend
  const addMessage = (msg) => {
    //front arr
    const { msgWriter, msgContent, msgTime, msgId } = msg;
    setMsg((prev) => {
      return [...prev, { msgWriter, msgContent, msgTime, msgId }];
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
    <section className="flex flex-col w-full h-full p-4">
      {code ? <Dashboard code={code} /> : <SpotifyAuth />}
      <div className="flex flex-col gap-2 overflow-y-scroll p-0 h-full">
        {messages.map((element) => {
          // making ChatMsg components from the messages array
          return <ChatMsg {...element} setMsg={setMsg} delMsg={delMsg} />;
        })}
      </div>

      <Keyboard
        postMsg={sendMessage}
        roomId={props.roomId}
        deleteAllMessages={deleteAllMessages}
      />
    </section>
  );
};

export default Chat;
