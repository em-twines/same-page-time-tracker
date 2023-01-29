import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import SelectUSState from 'react-select-us-states';


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
      console.log(res.data)

    } catch (error) {
      console.log(error, residence);
      toast(
        "Sorry! We have encountered an error updating your state of residence!"
      );
    }

    getAllEmployees();
  }

  // function toTitleCase(str) {
  //   return str.replace(/\w\S*/g, function (txt) {
  //     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  //   });
  // }


  const handleChange = (selectedState) => {
    // setResidence(selectedState);
    console.log(`State selected:`, selectedState);
    let newResidence = {
          state: selectedState
        };
        console.log("newResidence", newResidence);
        UpdateResidence(newResidence, el);


    
 
  // function handleChange(e, employee) {
  //   employee.state = e.target.value;
  //   let titleState = toTitleCase(employee.state);
  //   console.log("residence from handlechange :", titleState);
  //   let newState = {
  //     state: titleState
  //   };
  //   console.log("newState", newState);
  //   UpdateResidence(newState, employee);
  // }
  }
  return (

    <SelectUSState devaultValue={el.state} onChange={handleChange}/>
    // <form className="tenure-form">
    //   <input
    //     className="input-form-text"
    //     type="text"
    //     defaultValue={el.state}
    //     onChange={(e) => {
    //       handleChange(e, el);
    //     }}
    //   ></input>
    // </form>
  );
}
