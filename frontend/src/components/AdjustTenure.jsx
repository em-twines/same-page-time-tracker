import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ToggleSwitch from "./ToggleSwitch";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

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

export default function AdjustTenure({getAllEmployees, users}) {

  const [user, token] = useAuth();
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  
  function handleOpen() {
    setOpen(true);
    getAllEmployees();
  }



  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Adjust Staff Tenure</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >Adjust Staff Tenure</Typography>
       

       <table className="table table-striped">
          <thead>
            <tr>              
              <th>Name</th>
              <th></th>
              <th>Tenure in Years</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((el) => {
              return (
                <tr key={el.id}>
                  {/* {index + 1} */}
                  <td>{el.first_name}</td>
                  <td>{el.last_name}</td>
                  <td><form>
                    <label>Adjust Tenure</label>
                    <input type = 'number'></input>
                  </form></td>
                </tr>
              );
            })}
          </tbody>
        </table>

       

        <Button type = 'submit'>Submit</Button>

          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}
