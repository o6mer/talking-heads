import React, { useContext, useState, useRef, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DialogTitle } from "@mui/material";
import { UserContext } from "../../../../contexts/UserContextProvider";
import { socket } from "../../../MainPage.js";

export default function AddRoomDialog({ open, handleClose }) {
  const { darkMode, user } = useContext(UserContext);
  const [newRoom, setNewRoom] = useState({});
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

  const onTyping = (event) => {
    const { name, value } = event.target;
    setNewRoom((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    console.log(open);
    setFile();
    setPreviewUrl();
  }, [open]);

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

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

  const pickImageHandler = () => {
    // filePickerRef.current.click();
  };
  const pickHandler = (event) => {
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      const pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className={`${darkMode ? "bg-primaryDark text-white" : "bg-primary text-black"}`}>
        <DialogTitle>
          <div className="flex">
            <p className={"font-bold text-2xl"}>Create new room</p>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex">
            <input className="mt-auto mb-auto" type="file" accept=".jpg,.png,.jpeg" onChange={pickHandler} />
            {previewUrl ? (
              <img className="ml-auto h-auto rounded-lg shadow-md w-20 h-20" src={previewUrl} alt="preview"></img>
            ) : (
              <p className="ml-auto text-sm w-20 h-20 border">please pick img</p>
            )}
          </div>
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
  );
}
