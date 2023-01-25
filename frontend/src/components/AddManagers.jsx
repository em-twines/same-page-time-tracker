import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Modal, ToggleButton } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
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

export default function AddManagers({}) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
    getAllEmployees();
  }
  const handleClose = () => setOpen(false);
  const [users, setUsers] = useState([]);
  const [manager, setManager] = useState();
  const [managers, setManagers] = useState([]);
  const [user, token] = useAuth();
  const [toggle, setToggle] = useState([]);


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
      let managers = res.data.map((el) => {
        return el.is_manager === true;
      });
      setManagers(managers);
      setToggle(managers);
    } catch (error) {
      console.log(error);
      toast("Sorry! We have encountered an error getting all the requests!");
      // TODO: change alert
    }
  }

  async function makeManager(newManager, employee) {
    console.log("preflight",employee)
    console.log("preflight",newManager)
    try {
      let res = await axios.patch(
        `http://127.0.0.1:8000/api/requests_for_pto/manager/staff/manage/${employee.id}/`,
        newManager,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(res)
      setManager(res.data);
    } catch (error) {
      console.log(error);
      toast("Sorry! We have encountered an error making your requests!");
    }
    getAllEmployees();
  }

  function managerTrue(employee) {
    let newManager = {
      is_manager: true,
    };
    makeManager(newManager, employee);
  }
  function managerFalse(employee) {
    let newManager = {
      is_manager: false,
    };
    makeManager(newManager, employee);
  }

  function handleToggle(toggleValue, employee) {
    if (toggleValue) {
      managerTrue(employee);
    //   setToggle(toggle);
    } else {
      managerFalse(employee);
    //   setToggle(!toggle);
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
              <Typography
                id="modal-modal-description"
                sx={{ mt: 1 }}
                key={index}

              >
                {" "}
                {console.log("is manager", el.is_manager)}

                {`${el.first_name} `} {el.last_name} <br></br>Make Manager
                <ToggleSwitch toggle={toggle} setToggle={handleToggle} element={el} />

              </Typography>
            );
          })}        
          <Button onClick={handleClose}>Close</Button>

        </Box>
      </Modal>
    </div>
  );
}
