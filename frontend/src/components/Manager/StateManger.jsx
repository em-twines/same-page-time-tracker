import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import SelectUSState from "react-select-us-states";

export default function StateManger({ getAllEmployees, el }) {
  const [user, token] = useAuth();

  async function UpdateResidence(residence, el) {
    console.log("axios", residence, el);
    try {
      let res = await axios.patch(
        `http://127.0.0.1:8000/api/requests_for_pto/manager/staff/manage/${el.id}/`,
        residence,

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error, residence);
      toast(
        "Sorry! We have encountered an error updating your state of residence!"
      );
    }

    getAllEmployees();
  }

  const handleChange = (selectedState) => {
    console.log(`State selected:`, selectedState);
    let newResidence = {
      state: selectedState,
    };
    console.log("newResidence", newResidence, el);
    UpdateResidence(newResidence, el);
  };
  return <SelectUSState defaultValue = {el.state} onChange={handleChange} />;
  // return <SelectUSState devaultValue={el.state} onChange={handleChange} />;
}
