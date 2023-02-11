import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


export default function AdjustPTO({ getAllEmployees, el }) {
  const [user, token] = useAuth();

  //!If backstroke hit, don't send data.

  function handleChange(e) {
    e.preventDefault();
    let newHours = {
      pto: parseInt(e.target.value),
    };
    setPTO(newHours);
}
    async function setPTO(time) {
      try {
        let res = await axios.patch(
          `http://127.0.0.1:8000/api/requests_for_pto/staff/pto-set/${el.id}/`,
          time,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(res.data)
        getAllEmployees();
      } catch (error) {
        console.log(error);
      }
    }

  
  return (
    <form className="tenure-form">
      <input
        className="input-form"
        type="number"
        defaultValue={el.pto}
        onChange={(e) => {
          handleChange(e);
        }}
      ></input>
    </form>
  );
}
