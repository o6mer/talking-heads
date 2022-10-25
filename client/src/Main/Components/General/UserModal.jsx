import React from "react";

import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Link from "@mui/material/Link";
import Picture from "../../Media/NameLogo.png";
const UserModal = ({ open, handleClose, userInfo }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {`${userInfo?.userName}`}
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {`email: `}
            <Link>{userInfo?.email}</Link>
          </Typography>
          <img src={Picture} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default UserModal;
