import React, { useState, useEffect } from "react";
import axios from "axios";
import CalendarEmployee from "../../components/Employee/CalendarEmployee";
import RequestForm from "../../components/Employee/RequestForm";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";

const HomePageEmployee = ({ decision, setDecision }) => {
  const [user, token] = useAuth();
  const [request_for_pto, setRequest] = useState({});
  const [requests_for_pto, setRequests] = useState([]);
  const [deletion, setDeletion] = useState(false);
  const [employee, setEmployee] = useState({});
  const [hours_requested, setHoursRequested] = useState();

  async function getRequests() {
    try {
      let res = await axios.get(
        `http://127.0.0.1:8000/api/requests_for_pto/employee/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setRequests(res.data);
    } catch (error) {
      console.log(error);
      alert("Sorry! We have encountered an error getting your requests!");
    }
  }

  async function getUserInfo() {
    try {
      let res = await axios.get(
        `http://127.0.0.1:8000/api/requests_for_pto/staff/${user.id}/
        `,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setEmployee(res.data);
    } catch (error) {
      console.log(error);
      toast("Sorry! We have encountered an error getting all the requests!");
    }
  }

  useEffect(() => {
    getRequests();
  }, [decision, deletion]);

  return (
    <div className="container">
      <ToastContainer />

      <div className="title">Home Page for {user.username}!</div>
      <div className="calendar-and-form-container">
        <div className="vertical-flex">
          {/* <PTO getUserInfo = {getUserInfo} employee = {employee}/> */}
          <RequestForm
            setRequest={setRequest}
            user={user}
            token={token}
            getRequests={getRequests}
            getUserInfo={getUserInfo}
            employee={employee}
            hours_requested={hours_requested}
            setHoursRequested ={setHoursRequested}
          />
        </div>
        <CalendarEmployee
          decision={decision}
          setDecision={setDecision}
          requests_for_pto={requests_for_pto}
          deletion={deletion}
          setDeletion={setDeletion}
          getRequests={getRequests}
          hours_requested={hours_requested}
          setHoursRequested ={setHoursRequested}

        />
      </div>
    </div>
  );
};

export default HomePageEmployee;
