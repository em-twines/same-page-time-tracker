import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import useAuth from "../../hooks/useAuth";


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

export default function MuiEmployee({

  open,
  setOpen,
  title,
  message,

  hours,

}) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  const [user, token] = useAuth();
//   const [decision, setDecision] = useState();

  const handleClose = () => setOpen(false);

 
  
  return (
    <div>
      {/* <Button onClick={()=>{handleOpen(); handleEventClick()}}>View Details</Button> */}
      <ToastContainer
        autoClose={2500}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Hours: {hours}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Message: {message}
          </Typography>
        
        </Box>
      </Modal>
    </div>
  );
}
