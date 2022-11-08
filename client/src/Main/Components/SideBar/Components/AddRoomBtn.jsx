import React, { useContext } from "react";
import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { UserContext } from "../../../../contexts/UserContextProvider";
import { DialogTitle } from "@mui/material";

const AddRoomBtn = ({ setRoomList }) => {
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
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          borderColor: "#0e7b52",
          color: "#0e7b52",
          "&:hover": {
            borderColor: "#095236",
          },
        }}
      >
        Create new room
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <div className={`${darkMode ? "bg-primaryDark text-white" : "bg-primary text-black"}`}>
          <DialogTitle>
            <p className={"font-bold text-2xl"}>Create new room</p>
          </DialogTitle>
          <DialogContent>
            <TextField
              id={`${darkMode && "inputNewRoomDark"}`}
              margin="dense"
              onChange={onTyping}
              name="name"
              label="Name"
              InputLabelProps={{
                className: `${darkMode && "newRoomInputLabelDark"}`,
              }}
              fullWidth
              variant="standard"
            />

            <TextField
              margin="dense"
              id={`${darkMode && "inputNewRoomDark"}`}
              onChange={onTyping}
              name="maxPop"
              label="Size"
              InputLabelProps={{
                className: `${darkMode && "newRoomInputLabelDark"}`,
              }}
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              <p className={`${darkMode && "text-white"}`}>Cancel</p>
            </Button>
            <Button onClick={handleSubmit}>
              <p className={`${darkMode && "text-white"}`}>Submit</p>
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default AddRoomBtn;
