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
  openChild,
  setOpenChild,
  getRequests,
  date,
  hours,
  message,
}) {
  const [user, token] = useAuth();
  //   const [openChild, setOpenChild] = useState(false);
  const handleClose = () => setOpen(false);
  function handleOpenChild() {
    // setOpenChild(true);
    // setOpenChild(true);
    // console.log('details', message)
  }
  const handleCloseChild = () => setOpenChild(false);
  const [request_text, setRequestText] = useState();
  const [day, setDay] = useState();
  const [hours_requested, setHoursRequested] = useState();

  async function deleteRequest() {
    try {
      let res = await axios.delete(
        `http://127.0.0.1:8000/api/requests_for_pto/submit/${eventInQuestionEmployee.id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.log(error);
      toast("Sorry! We have encountered an error getting your requests!");
    }
    setDeletion(!deletion);
    getEventsObjectsEmployee();
  }


  function handleSubmit(event) {
    event.preventDefault();
    let editedRequest = {
      request_text: request_text,
      day: day,
      hours_requested: hours_requested,
      decision: false,
      is_pending: true,
    };
    postRequest(editedRequest);
    setRequestText("");
    setDay();
    setHoursRequested();
    handleCloseChild();
  }

  async function postRequest(editedRequest) {
    try {
      let res = await axios.put(
        `http://127.0.0.1:8000/api/requests_for_pto/submit/${eventInQuestionEmployee.id}`,
        editedRequest,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getRequests();
    } catch (error) {
      console.log(error, editedRequest);
      toast("Sorry! We have encountered an error editing your request!");
    }
  }

  return (
    <div>

      <Modal
        open={openChild}
        onClose={handleCloseChild}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Request
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit} className="form-content">
              <h2>Request PTO</h2>
              <label>Add a Message</label>
              <input
                className="form input"
                type="text"
                defaultValue={message}
                onChange={(event) => setRequestText(event.target.value)}
                required
                value={request_text}
              ></input>
              <label>Day</label>
              <input
                className="form input"
                defaultValue={date}
                type="date"
                // onKeyDown={(e) => e.preventDefault()}
                onChange={(event) => setDay(event.target.value)}
                required
                value={day}
              ></input>
              <label>Hours</label>
              <input
                className="form input"
                defaultValue={hours}
                type="number"
                onChange={(event) => setHoursRequested(event.target.value)}
                required
                value={hours_requested}
              ></input>
              <div className="align-buttons-horizontal">
                <Button variant="contained" type="submit" size="small">
                  Submit Edits
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={() => {
                    deleteRequest();
                    handleCloseChild();
                  }}
                >
                  Delete
                  {/* !! TODO: add 'are you sure popover' !*/}
                </Button>
              </div>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
