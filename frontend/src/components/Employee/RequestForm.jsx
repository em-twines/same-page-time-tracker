import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Modal, ToggleButton } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";

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

export default function RequestForm({
  user,
  token,
  setRequest,
  requests_for_pto,
  getRequests,
  employee,
  getUserInfo,
  hours_requested,
  setHoursRequested,
}) {
  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth();
  let cYear = currentDate.getFullYear();

  const [request_text, setRequestText] = useState("");
  const [day, setDay] = useState();
  const [open, setOpen] = useState(false);
  const [pto, setPTO] = useState();

  useEffect(() => {
    getUserInfo();
    // setPTO(employee.pto)
  }, []);

  function handleOpen() {
    // console.log(pto);

    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  //default: cYear + "-" + cMonth + "-" + cDay

  function handleSubmit(event) {
    event.preventDefault();
    let newRequest = {
      request_text: request_text,
      day: day,
      hours_requested: hours_requested,
      decision: false,
      is_pending: true,
    };
    console.log(newRequest.hours_requested, employee.pto);
    if (newRequest.hours_requested <= employee.pto) {
      console.log(newRequest.hours_requested <= employee.pto);
      postRequest(newRequest);
      let newHours = {
        pto: parseInt(-Math.abs(hours_requested)),
      };
      console.log("preflight pto", employee.pto);
      affectPTO(newHours);
      console.log("postflight pto", employee.pto);
      setRequestText("");
      setDay();
      setHoursRequested(0);
      handleClose();
    } else {
      toast("Insufficient PTO Remaining");
    }
  }

  async function postRequest(newRequest) {
    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/requests_for_pto/submit/`,
        newRequest,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setRequest(requests_for_pto, newRequest);
      getRequests();
    } catch (error) {
      console.log(error, newRequest);
      toast(
        "Sorry! We have encountered an error processing your submission request!"
      );
      // TODO: change alert.
    }
  }

  async function affectPTO(hours) {
    try {
      let res = await axios.patch(
        `http://127.0.0.1:8000/api/requests_for_pto/staff/pto/${employee.id}/`,
        hours,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getUserInfo();
      getRequests();
    } catch (error) {
      console.log(error);
      toast("Sorry! We have encountered an error in managing your pto bank!");
    }
  }

  return (
    <div className="form-container ">
      <div>
        <div>
          <Button variant="contained" onClick={handleOpen}>
            Request PTO
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Request PTO
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Remining PTO: {employee.pto} hours
              </Typography>

              <form onSubmit={handleSubmit} className="form-content">
                <label>Add a Message</label>
                <input
                  className="form input"
                  type="text"
                  defaultValue = "May I please take PTO on this day?"
                  onChange={(event) => setRequestText(event.target.value)}
                  required
                  value={request_text}
                ></input>
                <label>Day</label>
                <input
                  className="form input"
                  defaultValue = '{{currentDate}}'
                  type="date"
                  // onKeyDown={(e) => e.preventDefault()}
                  onChange={(event) => setDay(event.target.value)}
                  required
                  value={day}
                ></input>
                <label>Hours</label>
                <input
                  className="form input"
                  type="number"
                  onChange={(event) => setHoursRequested(event.target.value)}
                  required
                  value={hours_requested}
                ></input>
                <button type="submit">Submit Request</button>
              </form>

              <Button onClick={handleClose}>Close</Button>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
}
