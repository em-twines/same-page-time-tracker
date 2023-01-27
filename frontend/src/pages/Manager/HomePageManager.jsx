import React, { useEffect, useState } from "react";
import CalendarManager from "../../components/Manager/CalendarManger";
import AddManagers from "../../components/Manager/AddManagers";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AdjustTenure from "../../components/Manager/AdjustTenure";



export default function HomePageManager({ decision, setDecision }) {
  const [user, token] = useAuth();
  const [requests, setRequests] = useState([]);
  const [eventsDefined, setEvents] = useState();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
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

  async function getAllRequests() {
    try {
      let res = await axios.get(
        `http://127.0.0.1:8000/api/requests_for_pto/manager/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setRequests(res.data);
    } catch (error) {
      console.log(error);
      toast("Sorry! We have encountered an error getting all the requests!");
    }
  }

  function handleSubmit(event) {
    getAllRequests();
  }

  useEffect(() => {
    getAllRequests();
  }, [decision]);

  return (
    <div className="container">
      <ToastContainer />

      <div className="title">Home Page for {user.username}!</div>
      <div className="calendar-and-form-container">
        <div className = 'button-containter-manager'>
        <AddManagers getAllEmployees = {getAllEmployees} users = {users} toggle = {toggle} setToggle = {setToggle}/>
          <AdjustTenure getAllEmployees = {getAllEmployees} users = {users} />{/* <div className="calendar-and-button-container"> */}
          </div>
          {requests.length > 0 ? (
            <>
              <CalendarManager
                requests={requests}
                getAllRequests={getAllRequests}
                eventsDefined={eventsDefined}
                setEvents={setEvents}
                decision={decision}
                setDecision={setDecision}
              />
            </>
          ) : null}
          {/* <Button
            variant="contained"
            onClick={() => navigate("/manager/manage-staff")}
          >
            Manage Staff
          </Button> */}
          
        </div>
      </div>
    // </div>
  );
}
