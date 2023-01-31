import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { Button } from "@mui/material";

export default function NewPTOSetting({}) {
  const [ptoFrequencyPerYear, setPtoFrequencyPerYear] = useState();
  const [ptoHoursPerYear, setPtoHoursPerYear] = useState();
  const [user, token] = useAuth();
  const [hours, setHours] = useState();
  const [frequency, setFrequency] = useState();

  async function getAllEmployeesCheckPTO() {
    try {
      let res = await axios.get(
        `http://127.0.0.1:8000/api/requests_for_pto/manager/staff/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.log(error);
      toast("Sorry! We have encountered an error getting all the requests!");
    }
  }

  async function postAPtoFrequency(frequency) {
    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/requests_for_pto/manager/settings/frequencies/
          `,
        frequency,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setPtoFrequencyPerYear(res.data);
      getAllEmployeesCheckPTO();
    } catch (error) {
      console.log(error);
      toast(
        "Sorry! We have encountered an error getting your pto hours allowance per year!"
      );
    }
  }

  async function postAPtoHourRate(hours) {
    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/requests_for_pto/manager/settings/hours/
          `,
        hours,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setPtoHoursPerYear(res.data);
      getAllEmployeesCheckPTO();
    } catch (error) {
      console.log(error);
      toast("Sorry! We have encountered an error posting your pto frequency!");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    let newPTOFrequency = {
      frequency: parseInt(frequency),
    };
    let newPTOHours = {
      hours: hours,
    };
    postAPtoHourRate(newPTOHours);
    postAPtoFrequency(newPTOFrequency);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} id="post-pto" className="new-pto-form">
        <div>
          <label>Set New Yearly Allowance (hrs):</label>
          <hr></hr>
          <br></br>
          <input
            type="number"
            onChange={(event) => setHours(event.target.value)}
            required
            // value={response }
          ></input>
        </div>
        <div>
          <label>Set New Tenure Tier (days):</label>
          <hr></hr>
          <br></br>

          <input
            type="number"
            onChange={(event) => setFrequency(event.target.value)}
            required
            // value={response }
          ></input>
        </div>
      </form>
      <div className = 'button-container-post'>
      <Button
        form="post-pto"
        className="post-button"
        type="submit"
        variant="contained"
      >
        Submit
      </Button>
    </div></div>
  );
}
