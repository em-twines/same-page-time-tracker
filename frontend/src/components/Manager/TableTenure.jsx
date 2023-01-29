import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


export default function TableTenure({ getAllEmployees, users , el}) {
  const [user, token] = useAuth();
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [tenure, setTenure] = useState([]);




  async function UpdateTenure(tenure, employee) {
    console.log('axios', tenure, employee)
    try {
      let res = await axios.patch(
        `http://127.0.0.1:8000/api/requests_for_pto/manager/staff/manage/tenure/${employee.id}/`,
        tenure,

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );        

    } catch (error) {
      console.log(error);
      toast("Sorry! We have encountered an error making your requests!");
    }
    
    getAllEmployees();
  }


  function handleSubmit(event, el){
    
}


function handleChange(e, employee){
    employee.tenure = e.target.value;
    // setTenure(employee.tenure)
    e.preventDefault();
    console.log('tenure from handlechange :', tenure)
    let newTenure = {
        tenure: parseInt(employee.tenure)
    }
    console.log('newTenure', newTenure)
    UpdateTenure(newTenure, employee);
  }
return(

                      <form
                        onSubmit={(event)=>{handleSubmit(event,el)}}
                      >
                       <input
                          type="number"
                          defaultValue = {el.tenure}
                          onChange={(e) => {
                            handleChange(e, el);
                          }}
                        ></input>     
                         </form>                 


)
}