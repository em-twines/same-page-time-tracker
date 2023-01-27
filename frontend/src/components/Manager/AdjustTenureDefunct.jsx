import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";
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

export default function AdjustTenure({ getAllEmployees, users }) {
  const [user, token] = useAuth();
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [tenure, setTenure] = useState([]);
  const [changes, setChanges] = useState(0);
  const [events, setEvents] = useState([]);
  const [elements, setElements] = useState([]);
  const [indices, setIndices] = useState([]);

  function handleOpen() {
    setOpen(true);
    getAllEmployees();
  }

//   //   function handleSubmit(event, el, e){
//   //   function handleSubmit(){
//   //     for (let i =0; i < events.length; i++){
//   //         let newTenure ={
//   //         tenure: parseInt(tenure)
//   //         }
//   //         setTenure([...tenure, newTenure])
//   //         console.log('tenure from handlechange :', [...tenure, newTenure])
//   //     }
//   //     UpdateTenure(tenure, elements)

//   //   }

//   //   function handleSubmit(){
//   //     console.log(changes);
//   //     let i = 0;
//   //     while (changes.length < i)
//   //         prepareSubmit();
//   //         i++
//   //     }

// //   function SettingStates(e, el, index) {
// //     setEvents([...events, e]);
// //     setElements([...elements, el]);
// //     setIndices([...indices, index]);
// //   }

// //   function handleChange(e, employee, index) {
// //     employee.tenure = e.target.value;
// //     if (employee.tenure > null){
// //          setTenure([...tenure, employee.tenure]);
// //     console.log([...tenure, employee.tenure]);
// //     }
   
// //   }

//   async function UpdateTenure(e, el, index) {
//     setEvents([...events, e]);
//     setElements([...elements, el]);
//     setIndices([...indices, index]);

//     //tenure/employee
//     await Promise.all(elements.map((el) => {
//       try {
//         let res = axios.patch(
//           `http://127.0.0.1:8000/api/requests_for_pto/manager/staff/manage/tenure/${el.id}/`,
//           el.tenure,
//           {
//             headers: {
//               Authorization: "Bearer " + token,
//             },
//           }
//         );
  
//         // setTenure(tenure);
//         // console.log(tenure);
//         console.log(res.data);
//       } catch (error) {
//         console.log(error);
//         toast("Sorry! We have encountered an error making your requests!");
//       }
//     }))

    

//     getAllEmployees();
//   }

















  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Adjust Staff Tenure
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Adjust Staff Tenure
          </Typography>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th></th>
                <th>Tenure in Years</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((el, index) => {
                return (
                  <tr key={index}>
                    {/* {index + 1} */}
                    <td>{el.first_name}</td>
                    <td>{el.last_name}</td>
                    <td>
                      <form
                        id="submit-int"
                        onSubmit={(event) => {
                          UpdateTenure(event, el, index);
                        }}
                      >
                        <label>Adjust Tenure</label>
                        <input
                          type="number"
                          defaultValue={el.tenure}
                          onChange={(e) => {
                            handleChange(e, el, index);
                          }}
                        ></input>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Button variant="contained" form="submit-int" type="submit">
            Submit
          </Button>

          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
