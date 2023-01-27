import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AlertTitle, paperClasses } from "@mui/material";
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
  open,
  setOpen,
  title,
  eventInQuestion,
  personName,
  hours,
  getEventsObjects,
  decision,
  setDecision,
  userId,
  defaultMessage,
}) {
  const [user, token] = useAuth();
  const [pto, setPTO] = useState();
  const [message, setMessage] = useState(defaultMessage);

  const handleClose = () => setOpen(false);

  async function RespondToRequest(newDecision) {
    try {
      let res = await axios.patch(
        `http://127.0.0.1:8000/api/requests_for_pto/manager/${eventInQuestion.id}/`,
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

  async function refundPTO(time, id) {
    try {
      let res = await axios.patch(
        `http://127.0.0.1:8000/api/requests_for_pto/staff/pto/${id}/`,
        time,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(res.data);
      setPTO(res.data);
    } catch (error) {
      console.log(error);
      toast("Sorry! We have encountered an error in managing your pto bank!");
    }
  }

  function sendMessage() {
    console.log(message);
  }

  function approvePTO() {
    let newDecision = {
      decision: true,
    };
    RespondToRequest(newDecision);
  }

  function denyPTO() {
    let newHours = {
      pto: parseInt(hours),
    };
    refundPTO(newHours, userId);

    let newDecision = {
      decision: false,
    };
    RespondToRequest(newDecision);
  }

  function handleSubmit() {
    sendMessage();

    if (decision === true) {
      toast(`You approved ${personName}'s request for PTO!`);
    } else {
      toast(`You denied ${personName}'s request for PTO.`);
    }

    handleClose();
  }

  return (
    <div>
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
            }}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              denyPTO();
            }}
          >
            Deny
          </Button>
          {decision === true ? (
            <form onSubmit={handleSubmit}>
              <label>Message</label>
              <input type="text" default={defaultMessage}></input>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>Message</label>
              <p>Please supply a response.</p>
              <input
                type="text"
                onChange={(event) => setMessage(event.target.value)}
                required
                value={message}
              ></input>
            </form>
          )}
        </Box>
      </Modal>
    </div>
  );
}
