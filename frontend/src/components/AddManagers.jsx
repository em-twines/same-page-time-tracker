import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Modal, ToggleButton } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import ToggleSwitch from "./ToggleSwitch";


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

export default function AddManagers({ requests }) {
  const [open, setOpen] = useState(false);
  
  function handleOpen() {
    setOpen(true);
    GetUniqueUsers();
  }
  const handleClose = () => setOpen(false);
  const [users, setUsers] = useState();

  function GetUniqueUsers() {
    let uniqueUsers = [];
    uniqueUsers = requests.map((el) => {
      if (uniqueUsers.length == 0) {
        // uniqueUsers.push(`${el.user.first_name} ${el.user.last_name} `);
        return `${el.user.first_name} ${el.user.last_name} `
      } else if (uniqueUsers.length > 0) {
        if (!uniqueUsers.includes(el.last_name)) {
        //   uniqueUsers.push(`${el.user.first_name} ${el.user.last_name} `);
            return `${el.user.first_name} ${el.user.last_name} `
        }

      }
      uniqueUsers.reverse();
      return uniqueUsers 
    //   setUsers(uniqueUsers);
    });
    console.log('uniqueUsers from outtermost unction',  uniqueUsers )
    setUsers([... new Set(uniqueUsers)])

  }

  return (
    <div>
      <Button onClick={handleOpen}>Add Managers</Button>
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
          ></Typography>

          {users?.map((el) => {
            return (
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {el} <br></br>Make Manager<ToggleSwitch/>
              </Typography>
            );
          })}
        </Box>
      </Modal>
    </div>
  );
}
