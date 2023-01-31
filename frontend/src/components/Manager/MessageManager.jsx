import React, { useState } from "react";

import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "25%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

export default function MessageManager({ defaultMessage, setDefaultMessage }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState();
  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let newMessage = {
      text: text,
    };
    setDefaultMessage(newMessage);
  }

  return (
    <div>
      <button className = 'same-page-button' onClick={handleOpen}>
        Approval Message
      </button>
      {/* {defaultMessage ==!"Your PTO request has been approved!" ? ( */}
    
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Set Default Approval Message
              </Typography>

              <form onSubmit={handleSubmit}>
                <label>New Message</label>
                <textarea
                  required
                  defaultValue={defaultMessage}
                  onChange={(event) => setText(event.target.value)} value = {text}
                ></textarea>
           
              <button className = 'same-page-button'
                type="submit"
                variant="contained"
                onClick={() => {
                  handleClose();
                }}
              >
                Set Message
              </button> 
              
                </form>
            </Box>
          </Modal>
        </div>
    </div>
  );
}
