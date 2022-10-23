import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Keyboard = (props) => {
  const { sendMsg, roomId, postMsg, deleteAllMessages } = props;
  const [msg, setMsg] = useState("");

  function typing(event) {
    setMsg(event.target.value);
  }

  return (
    <div className="justify-self-end mt-auto h-min p-2 bg-primary">
      <form
        action=""
        className="flex gap-x-1 h-full"
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          postMsg(msg);
          setMsg("");
        }}
      >
        <div className="w-full mt-1 h-full">
          <TextField
            type="text"
            className="w-full "
            name="message"
            placeholder="Write a message"
            value={msg}
            onChange={typing}
          />
        </div>
        <IconButton type="submit">
          <SendIcon color="primary" />
        </IconButton>
        <IconButton onClick={deleteAllMessages}>
          <DeleteForeverIcon color="primary" />
        </IconButton>
      </form>
    </div>
  );
};

export default Keyboard;
