import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AlertTitle, paperClasses } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

export default function UpdatePTO({}) {
  const [user, token] = useAuth();
  const [pto, setPTO] = useState();
  const [hours, setHours] = useState();
  const [frequency, setFrequency] = useState();
  const [allPtoFrequenciesPerYear, setAllPtoFrequenciesPerYear] = useState([]);
  const [allPtoHoursPerYear, setAllPtoHoursPerYear] = useState([]);

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
        "Sorry! We have encountered an error getting your pto rate allowance per year!"
      );
    }
  }

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
      console.log(res.data);
      getAllEmployeesCheckPTO();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPtoFrequenciesPerYear();
    getAllPtoHoursPerYear();
  }, []);

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
    <div className = 'update-pto-form'>
      <div classname ='column1'>
        <h3>Hours</h3>

        {allPtoHoursPerYear.map((el, index) => {
          return (
            <div>
              <form

              // onSubmit={(event) => {
              //   handleSubmit1(event, el);
              // }}
              >
                <label>Tier {index + 1} (hrs):</label>
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

      <div classname ='column2'>
        <h3>Years</h3>
        {allPtoFrequenciesPerYear.map((el, index) => {
          return (
            <div>
              <form

              // onSubmit={(event) => {
              //   handleSubmit(event, el);
              // }}
              >
                <label>Tier {index + 1} (days):</label>
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
                {/* <Button type="submit" variant="contained">
              Submit
            </Button> */}
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
