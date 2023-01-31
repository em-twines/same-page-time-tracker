import React, { useState, useEffect } from "react";
import axios from "axios";
import CalendarEmployee from "../../components/Employee/CalendarEmployee";
import RequestForm from "../../components/Employee/RequestForm";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import Mail from "../../components/Employee/Mail";
import moment from "moment";
import { Button } from "@mui/material";

const HomePageEmployee = ({ decision, setDecision }) => {
  const [user, token] = useAuth();
  const [request_for_pto, setRequest] = useState({});
  const [requests_for_pto, setRequests] = useState([]);
  const [deletion, setDeletion] = useState(false);
  const [employee, setEmployee] = useState({});
  const [hours_requested, setHoursRequested] = useState();
  const [allPtoHoursPerYear, setAllPtoHoursPerYear] = useState([]);
  const [newYearPto, setNewYearPto] = useState(0);
  const [allPtoFrequenciesPerYear, setAllPtoFrequenciesPerYear] = useState([]);
  const [today, setToday] = useState();

  async function getAllPtoHoursPerYear() {
    try {
      let res = await axios.get(
        `http://127.0.0.1:8000/api/requests_for_pto/manager/settings/hours/
        `,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setAllPtoHoursPerYear(res.data);
    } catch (error) {
      console.log(error);
      toast(
        "Sorry! We have encountered an error getting your pto hours allowance per year!"
      );
    }
  }

  async function getAllPtoFrequenciesPerYear() {
    try {
      let res = await axios.get(
        `http://127.0.0.1:8000/api/requests_for_pto/manager/settings/frequencies/
        `,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setAllPtoFrequenciesPerYear(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast(
        "Sorry! We have encountered an error getting your pto hours allowance per year!"
      );
    }
  }
  async function UpdateTenureEmployee(tenure) {
    try {
      let res = await axios.patch(
        `http://127.0.0.1:8000/api/requests_for_pto/manager/staff/manage/tenure/${employee.id}/`,
        tenure,

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.log(error);
      toast("Sorry! We have encountered an error updating your tenure!");
    }
  }

  async function PatchPTO(time) {
    console.log(time);
    try {
      let res = await axios.patch(
        `http://127.0.0.1:8000/api/requests_for_pto/staff/pto-set/${employee.id}/`,
        time,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("post setPTO", res.data);
    } catch (error) {
      console.log(error);
      toast("Sorry! We have encountered an error in adjusting your pto bank!");
    }
  }

  function CalculateTenure() {
    let today = moment().format("YYYY-MM-DD").toString();
    today = new Date(today).toISOString().split("T")[0];

    let joined = user.date_joined.toString().slice(0, 10);
    joined = new Date(joined).toISOString().split("T")[0];

    today = Date.parse(today);
    joined = Date.parse(joined);

    let diff = today - joined;

    let final_diff = diff / 1000 / 60 / 60 / 24;

    if (final_diff % 365 === 1) {
      let newTenure = {
        tenure: parseInt(employee.tenure) + 1,
      };

      UpdateTenureEmployee(newTenure);
      if (employee.state == !"CA") {
        PatchPTO(CalculatePTO());
      } else {
        PatchPTO(employee.pto + CalculatePTO());
      }
    }
  }

  function CalculatePTO() {
    getAllPtoHoursPerYear();
    getAllPtoFrequenciesPerYear();
    let i = 0;
    let freq = allPtoFrequenciesPerYear.map((el) => {
      return el.frequency;
    });
    let hr = allPtoHoursPerYear.map((el) => {
      return el.hours;
    });
    while (employee.tenure > Math.floor(freq[i] / 365)) {
      if (Math.floor(freq[i]) / 365 <= employee.tenure) {
        console.log(i);
        i++;
      }
    }

    let newPTOHrs = {
      pto: hr[i - 1],
    };
    return newPTOHrs;
  }

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
    getUserInfo();
    CalculateTenure();
  }, [decision, deletion]);

  return (
    <div className="container">
      {/* <ToastContainer /> */}
      <div className="title">Welcome {user.username}!</div>

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
            setHoursRequested={setHoursRequested}
          />
        </div>
        <Mail />
        <CalendarEmployee
          decision={decision}
          setDecision={setDecision}
          requests_for_pto={requests_for_pto}
          deletion={deletion}
          setDeletion={setDeletion}
          getRequests={getRequests}
          hours_requested={hours_requested}
          setHoursRequested={setHoursRequested}
        />
      </div>
    </div>
  );
};

export default HomePageEmployee;
