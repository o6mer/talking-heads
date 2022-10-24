import React, { useContext, useEffect } from "react";
import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { UserContext } from "../../../../contexts/UserContextProvider";

const AddRoomBtn = ({ roomList, setRoomList }) => {
  const [open, setOpen] = useState(false);
  const defaultRoom = {
    name: "newRoom",
    maxPop: 10,
    pop: [],
    messages: [],
    currentSong: "drake",
  };

  const [roomId, setRoomId] = useState("");
  const [newRoom, setNewRoom] = useState(defaultRoom);

  const { darkMode } = useContext(UserContext);

  const onTyping = (event) => {
    const { name, value } = event.target;
    setNewRoom((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // setNewRoom(defaultRoom);
    setOpen(false);
  };

  const addRoomFront = (addedRoom) => {
    setRoomList((prev) => {
      return [...prev, addedRoom];
    });
  };

  //to get the new room id from mongo
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/room`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newRoom }),
      });
      const resData = await response.json(); //the room id
      const finalFinalTheLastRoom = {
        ...newRoom,
        _id: resData,
      };
      addRoomFront(finalFinalTheLastRoom);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${darkMode ? "bg-primaryDark" : "bg-primary"}`}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create new room
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new room</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            onChange={onTyping}
            name="name"
            label="Name"
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            onChange={onTyping}
            name="maxPop"
            label="Size"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddRoomBtn;
