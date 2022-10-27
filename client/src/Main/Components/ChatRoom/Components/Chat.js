import React, { useState, useEffect, useContext } from "react";
import ChatMsg from "./ChatMsg";
import Keyboard from "./Keyboard";
import { UserContext } from "../../../../contexts/UserContextProvider";
import { socket } from "../../../MainPage";
import SpotifyAuth from "../../SpotifyApi/SpotifyAuth";
import Dashboard from "../../SpotifyApi/Dashboard";

const code = new URLSearchParams(window.location.search).get("code");

const Chat = ({ roomId, msgsArr }) => {
  const [messages, setMessages] = useState(msgsArr); //keeping track on the messages
  const { user, currentRoomId, darkMode } = useContext(UserContext);

  useEffect(() => {
    socket.on("receiveMsg", (msg) => {
      addMessage(msg);
    });
    socket.on("removeMsg", (msgId) => {
      removeMsg(msgId);
    });
  }, []);

  //@@@ Back-End methods @@@

  //post a message to the backend (with socket.io)
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
      msgTime: `${
        time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()
      }:${
        time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
      }`,
      msgContent,
    };
    socket.emit("sendMsg", newMsg, currentRoomId, (resMsg) => {
      addMessage(resMsg);
    });
  };

  //@@@ Front-End methods @@@

  //send a message in the frontend (make it appear)
  const addMessage = (msg) => {
    //front arr
    const { msgWriter, msgContent, msgTime, msgId } = msg;
    setMessages((prev) => {
      return [...prev, { msgWriter, msgContent, msgTime, msgId }];
    });
  };

  //removes a message in the frontend (make it disappear)
  const removeMsg = (msgId) => {
    setMessages((prev) => {
      return prev.filter((msgElement) => {
        //.msgId is the message object field, msgId is the msgId which we want to delete
        return msgElement.msgId.toString() !== msgId.toString();
      });
    });
  };

  return (
    <section className="flex flex-col w-full h-full ">
      {code ? <Dashboard code={code} /> : <SpotifyAuth />}
      <div
        className={`flex flex-col gap-2 overflow-y-auto p-5 h-full ${
          darkMode ? "scrollbar-dark" : "scrollbar"
        }`}
      >
        {messages.map((element) => {
          // making ChatMsg components from the messages array
          return (
            <ChatMsg {...element} setMessages={setMessages} delMsg={delMsg} />
          );
        })}
      </div>

      <Keyboard postMsg={sendMessage} roomId={roomId} />
    </section>
  );
};

export default Chat;
