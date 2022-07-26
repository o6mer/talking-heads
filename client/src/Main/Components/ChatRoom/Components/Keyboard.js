import React from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useState } from "react";

import TextField from "@mui/material/TextField";

const Keyboard = (props) => {
  const [msg, setMsg] = useState("");

  function typing(event) {
    setMsg(event.target.value);
  }

  const postMsg = async () => {
    const newMsg = {
      msgWriter: "p1",
      msgTime: "28:00",
      msgContent: msg,
    };
    try {
      const response = await fetch(
        `http://localhost:3001/api/room/${props.roomId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...newMsg }),
        }
      );
      const resData = await response.json();
      props.sendMsg(resData); //updating the msg array in the front so the chat window will reRender
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      action=""
      className="flex gap-2 "
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        postMsg();
        setMsg("");
      }}
    >
      <TextField
        type="text"
        className="w-full"
        name="message"
        placeholder="Write a message"
        value={msg}
        onChange={typing}
      />
      <button
        type="submit"
        className="bg-white p-1 border-solid border-2 border-black"
      >
        <AiOutlineSend />
      </button>
    </form>
  );
};

export default Keyboard;
