import React, { useState, useEffect } from "react";
import axios from "axios";
import CalendarEmployee from "../../components/Employee/CalendarEmployee";
import RequestForm from "../../components/Employee/RequestForm";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import Mail from "../../components/Employee/Mail";
import moment from "moment";

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
        `http://127.0.0.1:8000/api/requests_for_pto/manager/staff/manage/tenure/${user.id}/`,
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

  async function setPTO(time) {
    console.log("pre setPTO", user.pto);

    try {
      let res = await axios.patch(
        `http://127.0.0.1:8000/api/requests_for_pto/staff/pto-set/${user.id}/`,
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
    getAllPtoHoursPerYear();
    getAllPtoFrequenciesPerYear();

    let today = moment().format("YYYY-MM-DD");
    let joined = user.date_joined.toString().slice(0, 10);
    console.log("joined", joined);
    if ((today - joined) % 365 === 1) {
      let newTenure = {
        tenure: user.tenure + 1,
      };
      UpdateTenureEmployee(newTenure);
      if (user.state == !"CA") {
        setPTO(CalculatePTO());
      }
    } else {
      setPTO(user.pto + CalculatePTO());
    }
  }

  function CalculatePTO() {
    console.log(allPtoFrequenciesPerYear)
    for (let i = 0; i < allPtoFrequenciesPerYear.length; i++) {
        if (allPtoFrequenciesPerYear[0]/365 < user.tenure) {
          console.log('if 1 hit')
          if (
            allPtoFrequenciesPerYear[i - 1]/365 <
            user.tenure <=
            allPtoFrequenciesPerYear[i]
          ) {console.log(
              "i, allPtoFrequenciesPerYear[i], allPtoHoursPerYear[i]",
              i,
              allPtoFrequenciesPerYear[i],
              allPtoHoursPerYear[i])
            return setNewYearPto(allPtoHoursPerYear[i]);
            
            
          } else {
            return setNewYearPto(allPtoHoursPerYear[0]);
          }
        }
      }
    
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
    CalculateTenure();
  }, [decision, deletion]);

  return (
    <div className="container">
      {/* <ToastContainer /> */}

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
