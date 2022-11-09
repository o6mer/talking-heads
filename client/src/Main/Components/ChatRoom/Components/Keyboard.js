import React, { useContext } from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { UserContext } from "../../../../contexts/UserContextProvider";

const Keyboard = (props) => {
  const { postMsg } = props;
  const [msg, setMsg] = useState("");

  const { darkMode } = useContext(UserContext);

  function typing(event) {
    setMsg(event.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (!msg) return;

    postMsg(msg);
    setMsg("");
  };

  return (
    <div className={`justify-self-end mt-auto h-min p-2 ${darkMode ? "bg-[#50626e]" : "bg-white"}`}>
      <form
        action=""
        className="flex justify-center items-center gap-x-1 h-full"
        method="POST"
        onSubmit={submitHandler}
      >
        <TextField
          type="text"
          className={`w-full ${darkMode ? "bg-[#a6bbc8]" : "bg-white"} rounded-lg`}
          name="message"
          placeholder="Write a message"
          value={msg}
          onChange={typing}
        />
        <button type="submit">
          <SendIcon
            fontSize="large"
            sx={{
              color: "#0e7b52",
              transition: "300ms all",
              borderRadius: "50%",
              padding: "0.3rem",
              "&:hover": {
                scale: "1.1",
                // backgroundColor: "#",
              },
            }}
          />
        </button>
      </form>
    </div>
  );
};

export default Keyboard;
