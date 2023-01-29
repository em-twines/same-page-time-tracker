import React, { useState , useEffect} from 'react';

import { Button } from '@mui/material'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'
import { ToastContainer, toast } from "react-toastify";
import EnhancedTable from '../../components/Manager/EnhancedTable';
import AddManagers from '../../components/Manager/AddManagers';
import AdjustTenure from '../../components/Manager/AdjustTenure';
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
        }
      }

useEffect(() => {
  getAllEmployees();
}, [])


  return (
    <div >
<div className = 'buttons-horizontal'>
          <AddManagers
            getAllEmployees={getAllEmployees}
            users={users}
            toggle={toggle}
            setToggle={setToggle}
          />
          <AdjustTenure getAllEmployees={getAllEmployees} users={users} />
          </div>
     {users.length > 0 ? (
        <EnhancedTable users = {users} setUsers = {setUsers} getAllEmployees = {getAllEmployees}/>) : null}
    </div>
  )
}
