import React, { useState } from 'react';
import CalendarManager from '../../components/Calendar/CalendarManger';
import axios from 'axios';


export default function HomePageManager({setRequest, setRequests, user, token, request_for_pto, requests_for_pto}) {
  const[currentEvents, setCurrentEvents] = useState(requests_for_pto);

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
      setRequests(res.data); 
      console.log(res.data)
      handleEvents(res.data);

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


  function handleEvents(events) {
    setCurrentEvents(requests_for_pto);


  }





  return (
    <div className = 'container'>
      <div className = 'title'>Home Page for {user.username}!</div>
      <div className = 'calendar-and-form-container'>
      <div className = 'calendar-and-button-container'>
        <CalendarManager request_for_pto = {request_for_pto} requests_for_pto = {requests_for_pto} user ={user} getAllRequests = {getAllRequests} setRequests = {setRequests} handleEvents = {handleEvents}/>
        <button onClick={handleSubmit}>Review Requests</button>
      </div>
      </div>
    </div>
  );
};

