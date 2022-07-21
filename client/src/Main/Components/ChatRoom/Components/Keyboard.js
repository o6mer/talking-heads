import React from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useState } from "react";

import TextField from "@mui/material/TextField";
// import SendIcon from "@mui/icons-material/Send";

const Keyboard = (props) => {
  const [msg, setMsg] = useState({
    msgWriter: "p1",
    msgContent: "",
    msgTime: "00:00",
  });

  function typing(event) {
    setMsg((prev) => {
      return {
        ...prev,
        msgContent: event.target.value,
      };
    });
  }

  return (
    // <section className="w-full bg-slate-300 px-5 py-3 ">
    <form action="" className="flex gap-2 ">
      <TextField
        type="text"
        className="w-full"
        name="message"
        placeholder="Write a message"
        value={msg.msgContent}
        onChange={typing}
      />
      <button
        type="submit"
        className="bg-white p-1 border-solid border-2 border-black"
        onClick={(e) => {
          fetch(`http://localhost:3001/api/room/${props.roomId}`, {
            method: "POST",
          });
          e.preventDefault();
          props.sendMsg(msg);
          setMsg(() => {
            return {
              msgWriter: "p1",
              msgContent: "",
              msgTime: "00:00",
            };
          });
        }}
      >
        <AiOutlineSend />
      </button>
    </form>
    // </section>
  );
};

export default Keyboard;
