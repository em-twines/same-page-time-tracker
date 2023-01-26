import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Modal, ToggleButton } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
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

export default function PTO({ getUserInfo, employee }) {
  const [open, setOpen] = useState(false);
  const [user, token] = useAuth();

  function handleOpen() {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getUserInfo();
  }, [user]);

  return (
    <div className="pto">
      <div>
        <Button variant="contained" onClick={handleOpen}>
          Check PTO
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Check PTO
            </Typography>

            <Button onClick={handleClose}>Close</Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
