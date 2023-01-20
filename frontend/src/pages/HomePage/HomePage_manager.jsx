import React from 'react'
import CalendarManager from '../../components/Calendar/CalendarManger';
import axios from 'axios';


export default function HomePage_manager({setRequest, user, token,request_for_pto}) {

  async function getAllRequests(){

    try{
    let res = await axios.get(`http://127.0.0.1:8000/api/requests_for_pto/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(res.data);
      setRequest(res.data); 
    }
    catch (error) {
      console.log(error)
      alert('Sorry! We have encountered an error getting all the requests!');
      // TODO: change alert
    }
  }

  
  function handleSubmit(event) {
    getAllRequests()
  }






  return (
    <div className = 'container'>
      <div className = 'title'>Home Page for {user.username}!</div>
      <div className = 'calendar-and-form-container'>
      <div className = 'calendar-and-button-container'>
        <CalendarManager request_for_pto = {request_for_pto} user ={user} getAllRequests = {getAllRequests}/>
        <button onClick={handleSubmit}>Review Requests</button>
      </div>
      </div>
    </div>
  );
};

