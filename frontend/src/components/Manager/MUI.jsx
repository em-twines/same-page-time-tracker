import React, { useState, useEffect } from "react";
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
  message

}) {
  const [user, token] = useAuth();
  const [pto, setPTO] = useState();
  const [clicked, setClicked] = useState(false);
  const [response, setResponse] = useState('Your request has been denied.');
  const [message_text, setMessage] = useState('');
  const [recipient, setRecipient] = useState();
  const [sender, setSender] = useState();


  const handleClose = () => setOpen(false);

  useEffect(() => {
    setSender(user.id)
    setRecipient(userId)
  }, [])
  

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
      // setDecision(res.data.decision);
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
      setPTO(res.data);
    } catch (error) {
      console.log(error);
      toast("Sorry! We have encountered an error in managing your pto bank!");
    }
  }


  async function sendMessage(newMessage) {
    console.log('newMessage in async' , newMessage)
    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/message/`,
        newMessage,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );      
      console.log('res.data' ,res.data)

      setMessage(res.data);
    } catch (error) {
      console.log(error);
      toast("Sorry! We have encountered an error in sending your message!");
    }
  }



  function approvePTO() {
    setDecision(true);
    let newDecision = {
      decision: true,
    };
    RespondToRequest(newDecision);
    let newMessage ={
      sender: sender,
      recipient: recipient,
      message_text: response,
      is_read: false
    }

    sendMessage(newMessage);
    console.log('newMessage', newMessage)

    handleClose();
    toast(`You approved ${personName}'s request for PTO!`);

  }

  function denyPTO() {
    setDecision(false);

    let newHours = {
      pto: parseInt(hours),
    };
    refundPTO(newHours, userId);
    let newDecision = {
      decision: false,
    };
    console.log('newDecision', newDecision)
    RespondToRequest(newDecision);
    setClicked(true);
  }

  function handleSubmit() {
    let newMessage ={
      sender: sender,
      recipient: recipient,
      message_text: response,
      is_read: false
    }
    sendMessage(newMessage);
    console.log('user.id, userId', user.id, userId)
    console.log('sender, recipient', sender, recipient)
    if (decision === false) {
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
           {clicked ? (
            <div>
              {decision ? (
                <div></div>
                // <form onSubmit={handleSubmit}>
                //   <lable>Send a Response</lable>
                //   <textarea type="text" defaultValue={defaultMessage}></textarea>
                //   <Button type = 'submit' variant = 'contained'>Submit</Button>
                // </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label>Message:</label>
                  <textarea
                    type="text"
                    defaultValue={response}
                    onChange={(event) => setResponse(event.target.value)}
                    required
                    value={response }
                  ></textarea>
                  <Button type = 'submit' variant = 'contained'>Submit</Button>
                </form>
              )}
            </div>
          ) : (
            <div>
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
         </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
