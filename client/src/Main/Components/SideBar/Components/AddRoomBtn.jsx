import React, { useContext } from "react";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { UserContext } from "../../../../contexts/UserContextProvider";
import { Collapse, DialogTitle } from "@mui/material";

import { socket } from "../../../MainPage.js";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddRoomBtn = ({ scrollToBottom }) => {
  const { darkMode, user } = useContext(UserContext);

  const defaultRoom = {
    name: "",
    maxPop: 0,
    pop: [],
    messages: [],
    roomCreator: user._id,
  };

  const [open, setOpen] = useState(false);
  const [newRoom, setNewRoom] = useState(defaultRoom);
  const [AddIcon, setAddIcon] = useState(AddCircleOutlineIcon);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {}, []);

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

  const handleMouseOver = (event) => {
    setAddIcon(AddCircleIcon);
    setHovered(true);
    setTimeout(scrollToBottom, 200);
  };
  const handleMouseOut = () => {
    setAddIcon(AddCircleOutlineIcon);
    setHovered(false);
  };

  //to get the new room id from mongo
  const handleSubmit2 = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/room`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newRoom }),
      });

      const resData = await response.json(); //the room id
      if (resData.statusCode === 400) {
        alert(resData.message);
        return;
      }
      const finalFinalTheLastRoom = {
        ...newRoom,
        _id: resData,
      };
      // addRoomFront(finalFinalTheLastRoom);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    const { name, maxPop } = newRoom;
    handleClose();
    try {
      socket.emit("addRoom", user._id, name, maxPop, (response) => {
        if (response.statusCode === 400 || response.statusCode === 404) {
          alert(response.message);
          return;
        }
        console.log(response.message);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className={`text-center mt-4`} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
        <AddIcon fontSize="large" onClick={handleClickOpen} className="hover:cursor-pointer" />
        <Collapse in={hovered}>
          <p className="text-xl">Create a room</p>
        </Collapse>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <div className={`${darkMode ? "bg-primaryDark text-white" : "bg-primary text-black"}`}>
          <DialogTitle>
            <p className={"font-bold text-2xl"}>Create new room</p>
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
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
