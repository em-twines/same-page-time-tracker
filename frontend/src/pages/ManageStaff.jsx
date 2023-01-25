import React, { useState } from 'react';

import AddManagers from '../components/AddManagers'
import { Button } from '@mui/material'
import AdjustTenure from '../components/AdjustTenure'
import axios from 'axios'
import useAuth from '../hooks/useAuth'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";



export default function ManageStaff() {

    const [users, setUsers] = useState([]);
    const [managers, setManagers] = useState([]);
    const [toggle, setToggle] = useState([]);
    const [user, token] = useAuth();

    async function getAllEmployees() {
        try {
          let res = await axios.get(
            `http://127.0.0.1:8000/api/requests_for_pto/manager/staff/`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
    
          setUsers(res.data);
          let managers = res.data.map((el) => {
            return el.is_manager === true;
          });
          setManagers(managers);
          setToggle(managers);
        } catch (error) {
          console.log(error);
          toast("Sorry! We have encountered an error getting all the requests!");
          // TODO: change alert
        }
      }



  return (
    <div className = 'calendar-and-form-container align-buttons'>
    <AddManagers getAllEmployees = {getAllEmployees} users = {users} toggle = {toggle} setToggle = {setToggle}/>
    <AdjustTenure getAllEmployees = {getAllEmployees} users = {users} />
    {/* <AdjustState/> */}
    </div>
  )
}
