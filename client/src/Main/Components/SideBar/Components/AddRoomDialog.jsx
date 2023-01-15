import React, { useContext, useState, useRef, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import LoadingButton from "@mui/lab/LoadingButton";

import { DialogTitle } from "@mui/material";
import { UserContext } from "../../../../contexts/UserContextProvider";

export default function AddRoomDialog({ open, handleClose }) {
  const { darkMode, user, socket } = useContext(UserContext);
  const [newRoom, setNewRoom] = useState({});
  const [isLoadingRoom, setIsLoadingRoom] = useState();
  const [file, setFile] = useState(undefined);
  const [previewUrl, setPreviewUrl] = useState(undefined);
  const [isValid, setIsValid] = useState(false);

  const clearImage = () => {
    setPreviewUrl();
    setFile();
  };

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
    clearImage();
    setIsLoadingRoom(false);
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

    //Validation~
    if (!name || !maxPop) {
      alert("Please fill the required fields");
      return;
    }
    if (
      !/[a-zA-Z]/.test(name) ||
      maxPop <= 0 ||
      !/^[1-9]\d*(\.\d+)?$/.test(maxPop)
    ) {
      alert("Invalid room attributes");
      return;
    }
    if (file?.size / Math.pow(1024, 2) > 0.5) {
      alert("whoa, too big man");
      return;
    }
    //~~~~~~~~~

    setIsLoadingRoom(true);

    try {
      socket.emit("addRoom", user._id, name, maxPop, file, (response) => {
        const { data } = response;
        if (data === "ERROR") {
          const { message, statusCode } = response;
          alert(`${message}. Error: ${statusCode}`);
          setIsLoadingRoom(false);
          return;
        }
        handleClose();
      });
    } catch (err) {
      console.log(err);
    }
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
      <div
        className={`${
          darkMode ? "bg-primaryDark text-white" : "bg-primary text-black"
        }`}
      >
        <DialogTitle>
          <p className={"font-bold text-2xl text-center"}>Create new room</p>
        </DialogTitle>
        <DialogContent>
          <div className="flex items-center justify-center">
            <div className="relative">
              <label className="hover:cursor-pointer ">
                {previewUrl ? (
                  <div className="">
                    <div className="border border-primary rounded-lg hover:border-thirdy transition-all ">
                      <img
                        className="ml-auto rounded-lg shadow-md w-20 h-20 shadow "
                        src={previewUrl}
                        alt="preview"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="ml-auto text-sm w-20 h-20 border-2 rounded-lg text-center hover:text-thirdy flex items-center justify-center transition-all">
                    <AddAPhotoOutlinedIcon fontSize="large" />
                  </div>
                )}{" "}
                <input
                  className="hidden"
                  type="file"
                  accept=".jpg"
                  onChange={pickHandler}
                  id="imgPicker"
                />
              </label>
              <div
                className="absolute right-0 bottom-0 hover:cursor-pointer translate-x-4 translate-y-4 rounded-full text-red-600 hover:text-red-800"
                onClick={clearImage}
              >
                {previewUrl && <HighlightOffIcon />}
              </div>
            </div>
          </div>
          <TextField
            autoFocus
            required
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
            required
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
          <LoadingButton loading={isLoadingRoom} onClick={handleSubmit}>
            <p className={`${darkMode && "text-white"}`}>Submit</p>
          </LoadingButton>
        </DialogActions>
      </div>
    </Dialog>
  );
}
