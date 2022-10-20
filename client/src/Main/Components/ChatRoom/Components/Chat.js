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

  useEffect(() => {
    socket.on("receiveMsg", (msg) => {
      addMessage(msg);
    });
    socket.on("removeMsg", (msgId) => {
      removeMsg(msgId);
    });
  }, []);

  const delMsg = async (msgId, userId, msgWriterId) => {
    socket.emit("delMsg", roomId, msgId, userId, msgWriterId, (socketRes) => {
      removeMsg(msgId); // delete the message in the front
      // can do something with socketRes
    });
    removeMsg(msgId);
  };

  //post a message to the backend (with socket.io)
  const sendMessage = async (msgContent) => {
    if (!socket) return;
    const time = new Date();
    let newMsg = {
      msgWriter: user._id, //need to be user Id (and then needed to be converted to user when coming to the front-end)
      msgTime: `${time.getHours()}:${time.getMinutes()}`,
      msgContent,
    };

    socket.emit("sendMsg", newMsg, currentRoomId, (resMsg) => {
      addMessage(resMsg);
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

  //removes a message in the frontend
  const removeMsg = (msgId) => {
    setMsg((prev) => {
      return prev.filter((msgElement) => {
        //.msgId is the message object field, msgId is the msgId which we want to delete
        return msgElement.msgId.toString() !== msgId.toString();
      });
    });
  };

  const deleteAllMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/room/deletMessages/${roomId}`
      );
      window.location.reload(false);
      setMsg([]);
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
