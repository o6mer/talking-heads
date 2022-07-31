import React from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useState } from "react";

import TextField from "@mui/material/TextField";

const Keyboard = (props) => {
  const { sendMsg, roomId, postMsg } = props;
  const [msg, setMsg] = useState("");

  function typing(event) {
    setMsg(event.target.value);
  }

  return (
    <form
      action=""
      className="flex gap-2 "
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        postMsg(msg);
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
