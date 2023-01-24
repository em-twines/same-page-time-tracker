import React, { useEffect, useState } from 'react';
import CalendarManager from '../../components/Calendar/CalendarManger';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";


export default function HomePageManager({decision, setDecision}) {
  const [user, token] = useAuth();
  const [requests, setRequests] = useState([])
  const [eventsDefined, setEvents] = useState();


  async function getAllRequests(){

    try{
    let res = await axios.get(`http://127.0.0.1:8000/api/requests_for_pto/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setRequests(res.data);
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


 useEffect(()=>{
  getAllRequests()
 },[decision])





  return (
    <div className = 'container'>
      <div className = 'title'>Home Page for {user.username}!</div>
      <div className = 'calendar-and-form-container'>
      <div className = 'calendar-and-button-container'>
        {requests.length > 0 ?
        <>
        <CalendarManager  requests={requests} getAllRequests = {getAllRequests} eventsDefined = {eventsDefined} setEvents = {setEvents} decision = {decision} setDecision = {setDecision}/>
        {/* <button onClick={handleSubmit}>Review Requests</button> */}
        </>
        :null}
      </div>
      </div>
    </div>
  );
};

