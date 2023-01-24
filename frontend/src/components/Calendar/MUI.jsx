import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AlertTitle } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

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

export default function MUI({
  requests,
  open,
  setOpen,
  title,
  message,
  eventInQuestion,
  personName,
  hours,
  getAllRequests,
  getEventsObjects,
  eventsDefined,
  decision,
  setDecision,
}) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  const [user, token] = useAuth();
//   const [decision, setDecision] = useState();

  const handleClose = () => setOpen(false);

  async function RespondToRequest(newDecision) {
    try {
      let res = await axios.patch(
        `http://127.0.0.1:8000/api/requests_for_pto/${eventInQuestion.id}/`,
        newDecision,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setDecision(res.data); 

    } catch (error) {
      console.log(error);
      toast("Sorry! We have encountered an error getting your requests!");
    }      

    getEventsObjects();

  }

  function approvePTO() {
    let newDecision = {
      decision: true,
    };
    toast(`You approved ${personName}'s request for PTO!`);
    RespondToRequest(newDecision);

  }
  function denyPTO() {
    let newDecision = {
      decision: false,
    };
    toast(`You denied ${personName}'s request for PTO.`);
    RespondToRequest(newDecision);


  }

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
          <Button
            variant="contained"
            onClick={() => {
              approvePTO();
              handleClose();
            }}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              denyPTO();
              handleClose();
            }}
          >
            Deny
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
