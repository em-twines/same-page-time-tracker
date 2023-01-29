import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Paper, Box , Button} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";



export default function AddStaff({getAllEmployees}) {
  const [user, token] = useAuth();
  const [employee, setEmployee] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isManager, setIsManager] = useState(false);
  const [name, setName] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [tenure, setTenure] = useState(0);
  const [state, setState] = useState("");
  const [pto, setPto] = useState(0);


  async function addEmployee(employee) {
        try {
          let res = await axios.post(
            `http://127.0.0.1:8000/api/requests_for_pto/submit/`,
            employee,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          setEmployee(employee);
          getAllEmployees();
        } catch (error) {
          console.log(error, employee);
          toast(
            "Sorry! We have encountered an error processing your submission request!"
          );

        }
      }
    





  async function deleteEmployee(employee) {}

  async function editEmployee(employee) {}



  function handleSubmit(event){
    event.preventDefault();
    let newEmployee = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        isManager: isManager,
        tenure: tenure,
        state: state,
        pto: pto,
    }
    console.log (newEmployee);
    addEmployee(newEmployee);
}


  return (
    <Box className  ='box' >
        {/* sx={{ width: "60%" }} */}
      <Paper >
        <form id="form" onSubmit ={handleSubmit}>
          <div >
            <label className="label-columns">First</label>
            <input
              className="input-for-form"
              type="text"
              onChange={(event) => setFirstName(event.target.value)}
              required
              value={firstName}
            ></input>
          </div>
          <div >
            <label className="label-columns">Last</label>
            <input
              className="input-for-form"
              type="text"
              onChange={(event) => setLastName(event.target.value)}
              required
              value={lastName}
            ></input>
          </div>

          <div >
            <label className="label-columns">Username</label>
            <input
              className="input-for-form"
              type="text"
              onChange={(event) => setUsername(event.target.value)}
              required
              value={username}
            ></input>{" "}
          </div>

          <div >
            <label className="label-columns">Email</label>
            <input
              className="input-for-form"
              type="text"
              onChange={(event) => setEmail(event.target.value)}
              required
              value={email}
            ></input>{" "}
          </div>

          <div >
            <label className="label-columns">Manager Status</label>
            <input
              className="input-for-form"
              type="text"
              onChange={(event) => setIsManager(event.target.value)}
              required
              value={isManager}
            ></input>{" "}
          </div>

          <div >
            <label className="label-columns">Tenure</label>
            <input
              className="input-for-form"
              type="number"
              onChange={(event) => setTenure(event.target.value)}
              required
              value={tenure}
            ></input>{" "}
          </div>

          <div >
            <label className="label-columns">State</label>
            <input
              className="input-for-form"
              type="text"
              onChange={(event) => setState(event.target.value)}
              required
              value={state}
            ></input>{" "}
          </div>

          <div >
            <label className="label-columns">PTO</label>
            <input
              className="input-for-form"
              type="number"
              onChange={(event) => setPto(event.target.value)}
              required
              value={pto}
            ></input>{" "}
          </div>
          <Button className = 'form-button' variant = 'contained' type = 'submit'>Submit</Button>
        </form>
      </Paper>
    </Box>
  );
}
