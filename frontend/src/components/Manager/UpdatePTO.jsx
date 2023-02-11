import React, { useState, useEffect } from "react";
import {toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AlertTitle, paperClasses } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

export default function UpdatePTO({
  allPtoFrequenciesPerYear,
  setAllPtoFrequenciesPerYear,
  allPtoHoursPerYear,
  setAllPtoHoursPerYear,
}) {
  const [user, token] = useAuth();
  const [pto, setPTO] = useState();
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

  async function patchNewHours(time, el) {
    try {
      let res = await axios.patch(
        `http://127.0.0.1:8000/api/requests_for_pto/manager/settings/hours/update/${el.id}/`,
        time,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getAllEmployeesCheckPTO();
    } catch (error) {
      console.log(error);
    }
  }

  async function patchNewFrequency(time, el) {
    try {
      let res = await axios.patch(
        `http://127.0.0.1:8000/api/requests_for_pto/manager/settings/frequencies/update/${el.id}/`,
        time,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getAllEmployeesCheckPTO();
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   getAllPtoFrequenciesPerYear();
  //   getAllPtoHoursPerYear();
  // }, []);

  function handleChange(e, el) {
    e.preventDefault();
    el.hours = e.target.value;

    let newPTO = {
      hours: el.hours,
    };
    patchNewHours(newPTO, el);
  }

  function handleChange1(e, el) {
    e.preventDefault();
    el.frequency = e.target.value;

    let newFreq = {
      frequency: el.frequency,
    };
    patchNewFrequency(newFreq, el);
  }

  return (
    <div>
      <div className="update-pto-form">
        <div >
          <h4>PTO Allowance in Hours</h4>

          {allPtoHoursPerYear.map((el, index) => {
            
            return (
              
              <div key = {index}>
                <form

                // onSubmit={(event) => {
                //   handleSubmit1(event, el);
                // }}
                >
                  <label>
                    <span>Tier {index + 1} (hrs): </span></label>
                  <input
                    className="input-for-update"
                    type="number"
                    onChange={(e) => {
                      handleChange(e, el);
                    }}
                    required
                    value={hours}
                    defaultValue={el.hours}
                  ></input>
                  {/* <Button type="submit" variant="contained">
              Submit
            </Button> */}
                </form>{" "}
              </div>
            );
          })}
        </div>

        <div >
          <h4>Tenure in Years</h4>
          {allPtoFrequenciesPerYear.map((el, index) => {
            return (
              <div key = {index}>
                <form

                // onSubmit={(event) => {
                //   handleSubmit(event, el);
                // }}
                >
                  <label>
                    <span>Tier {index + 1} (days): </span></label>
                  <input
                    className="input-for-update"
                    type="number"
                    onChange={(event) => {
                      handleChange1(event, el);
                    }}
                    required
                    value={frequency}
                    defaultValue={el.frequency}
                  ></input>
                </form>
              </div>
            );
          })}
        </div>
      </div>{" "}
      <hr></hr>
      <div className="button-container-post">
        {/* <button className="post-button same-page-button">Submit</button> */}
      </div>
    </div>
  );
}
