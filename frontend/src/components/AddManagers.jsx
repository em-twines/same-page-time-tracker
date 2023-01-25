import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Modal, ToggleButton } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import useAuth from "../hooks/useAuth";
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

export default function AddManagers({}) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
    // GetUniqueUsers();
    getAllEmployees();
  }
  const handleClose = () => setOpen(false);
  const [users, setUsers] = useState([]);
//   const [isManager, setIsManager] = useState({is_manager: });
  const[toggle, setToggle] = useState();
  const [user, token] = useAuth();

  //   function GetUniqueUsers() {
  //     let uniqueUsers = [];
  //     uniqueUsers = requests.map((el) => {
  //       if (uniqueUsers.length == 0) {
  //         // uniqueUsers.push(`${el.user.first_name} ${el.user.last_name} `);
  //         return `${el.user.first_name} ${el.user.last_name} `
  //       } else if (uniqueUsers.length > 0) {
  //         if (!uniqueUsers.includes(el.last_name)) {
  //         //   uniqueUsers.push(`${el.user.first_name} ${el.user.last_name} `);
  //             return `${el.user.first_name} ${el.user.last_name} `
  //         }

  //       }
  //       uniqueUsers.reverse();
  //       return uniqueUsers
  //     //   setUsers(uniqueUsers);
  //     });
  //     console.log('uniqueUsers from outtermost unction',  uniqueUsers )
  //     setUsers([... new Set(uniqueUsers)])

  //   }

  async function getAllEmployees() {
    try {
      let res = await axios.get(
        `http://127.0.0.1:8000/api/requests_for_pto/manager/staff/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setUsers(res.data);
    } catch (error) {
      console.log(error);
      alert("Sorry! We have encountered an error getting all the requests!");
      // TODO: change alert
    }
  }

  function makeManger(el){
    if(toggle){
        //post is manager true
    }
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
          
          {users?.map((el, index) => {
            return (
              <Typography id="modal-modal-description" sx={{ mt: 2 }} onClick={() => {setToggle(!toggle); console.log(el)}}>
                {`${el.first_name} `} {el.last_name} <br></br>Make Manager
             
                <Toggle />
              </Typography>
            );
          })}
        </Box>
      </Modal>
    </div>
  );
}
