import React, { useState } from "react";
import axios from "axios";

export default function RequestForm({
  token,
  setRequest,
  requests_for_pto,
  getRequests,
}) {
  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth();
  let cYear = currentDate.getFullYear();

  const [request_text, setRequestText] = useState("");
  const [day, setDay] = useState();
  const [hours_requested, setHoursRequested] = useState();

  //default: cYear + "-" + cMonth + "-" + cDay

  function handleSubmit(event) {
    event.preventDefault();
    debugger;
    let newRequest = {
      request_text: request_text,
      day: day,
      hours_requested: hours_requested,
      decision: false,
      is_pending: true,
    };
    console.log(newRequest)
    postRequest(newRequest);
    // setRequestText("");
    // setDay(currentDate);
    // setHours_requested();
  }

  //adds a comment with body to the database.
  async function postRequest(newRequest) {
    console.log(newRequest)
    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/requests_for_pto/submit/`,
        newRequest,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 201) {
        console.log(`if statement for 201 ${res}`);
      } else {
        console.log(`else statement for not 201 ${res}`);
      }
      setRequest(requests_for_pto, newRequest);
      getRequests();
    } catch (error) {
      console.log(error, newRequest);
      alert("Sorry! We have encountered an error processing your request!");
      // TODO: change alert.
    }
  }

  return (
    <div className="form-container ">
      <div >
        <form onSubmit={handleSubmit} className="form-content">
          <h2>Request PTO</h2>
          <label>Add a Message</label>
          <input
            className="form input"
            
            type="text"
            onChange={(event) => setRequestText(event.target.value)}
            required
            value={request_text}
          ></input>
          <label>Day</label>
          <input
            className="form input"
            // default = '{{currentDate}}'
            type="date"
            // onKeyDown={(e) => e.preventDefault()}
            onChange={(event) => setDay(event.target.value)}
            required
            value={day}
          ></input>
          <label>Hours</label>
          <input
            className="form input"
            default = {8}
            type="number"
            onChange={(event) => setHoursRequested(event.target.value)}
            required
            value={hours_requested}
          ></input>
          <button type="submit" >Submit Request</button>
        </form>
      </div>
    </div>
  );
}
