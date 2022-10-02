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
      sendMessage(msg);
    });
  }, []);

  const delMsg = async (msgId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/room/deleteOneMsg/${roomId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ msgId }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  //post a message to the backend
  const postMsg = async (msgContent) => {
    const time = new Date();
    const newMsg = {
      msgWriter: user.userName,
      msgTime: `${time.getHours()}:${time.getMinutes()}`,
      msgContent,
    };
    console.log("fuck");

    try {
      const response = await fetch(`http://localhost:3001/api/room/${roomId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newMsg }),
      });
      const resData = await response.json();
      console.log("@@@@@@@@@@@@@");
      console.log(resData);
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
        postMsg={postMsg}
        roomId={props.roomId}
        deleteAllMessages={deleteAllMessages}
      />
    </section>
  );
};

export default Chat;
