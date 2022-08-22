import React from "react";
import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AddRoomBtn = () => {
  const [open, setOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    roomName: "newRoom",
    maxPop: 10,
  });

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
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/room`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newRoom }),
      });
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  return (
    <div>
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
            name="roomName"
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
