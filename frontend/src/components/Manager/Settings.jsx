import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AlertTitle, paperClasses } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import axios from "axios";


export default function Settings({


}) {
  const [user, token] = useAuth();
  const [pto, setPTO] = useState();
  const [ptoFrequencyPerYear, setPtoFrequencyPerYear] = useState();
  const [ptoHoursPerYear, setPtoHoursPerYear] = useState();



  async function postAPtoFrequency() {
    // console.log(newPtoFrequency)
      try {
        let res = await axios.get(
          `http://127.0.0.1:8000/api/requests_for_pto/manager/settings/frequencies/
          `,
        //   newPtoFrequency,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
  
        setPtoFrequencyPerYear(res.data);
      } catch (error) {
        console.log(error);
        toast(
          "Sorry! We have encountered an error getting your pto hours allowance per year!"
        );
      }
    }



    async function postAPtoHourRate() {
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
  
        setPtoHoursPerYear(res.data);
      } catch (error) {
        console.log(error);
        toast(
          "Sorry! We have encountered an error getting your pto hours allowance per year!"
        );
      }
    }


  function handleSubmit() {
    let newPTOFrequency ={
        // frequency: frequency
    }
    let newPTOHours ={
        // hours: hours
    }
    postAPtoHourRate(newPTOHours)
    postAPtoFrequency(newPTOFrequency)
  }

  return (
    <div>
      
                <form onSubmit={handleSubmit}>
                  <label>Message:</label>
                  <textarea
                    type="text"
                    // onChange={(event) => setResponse(event.target.value)}
                    required
                    // value={response }
                  ></textarea>
                  <Button type = 'submit' variant = 'contained'>Submit</Button>
                </form>
          
     


    </div>
  );
}
