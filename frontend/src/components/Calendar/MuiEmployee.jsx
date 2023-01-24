import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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

export default function MuiEmployee({

  open,
  setOpen,
  eventInQuestionEmployee,
  getEventsObjectsEmployee,
  deletion,
  setDeletion,
}) {

  const [user, token] = useAuth();

  const handleClose = () => setOpen(false);

 
  async function deleteRequest(){

    try{
    let res = await axios.delete(`http://127.0.0.1:8000/api/requests_for_pto/submit/${eventInQuestionEmployee.id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    }
    catch (error) {
      console.log(error)
      alert('Sorry! We have encountered an error getting your requests!');
    }
    setDeletion(!deletion)
    getEventsObjectsEmployee();

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
        <Button
            variant="contained"
            color="error"
            onClick={() => {
              deleteRequest();
              handleClose();
            }}
          >
            Delete
            {/* !!!!!!!!!!!!!!!!!!!!! TODO: add are you sure popover !!!!!!!!!!!!!!!!!!*/}
        </Button>

          <Button
            variant="contained"
            // onClick={() => {
            //   handleClose();
            // }}
          >
            Edit
        </Button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            PTO Request
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Hours: {eventInQuestionEmployee.hours}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Message: {eventInQuestionEmployee.message}
          </Typography>
        
        </Box>
      </Modal>
    </div>
  );
}
