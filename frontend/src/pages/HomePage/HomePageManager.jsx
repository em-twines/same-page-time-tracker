import React, { useEffect, useState } from 'react';
import CalendarManager from '../../components/Calendar/CalendarManger';
import AddManagers from '../../components/AddManagers';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';



export default function HomePageManager({decision, setDecision}) {
  const [user, token] = useAuth();
  const [requests, setRequests] = useState([])
  const [eventsDefined, setEvents] = useState();


  async function getAllRequests(){

    try{
    let res = await axios.get(`http://127.0.0.1:8000/api/requests_for_pto/manager/`,
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
      toast('Sorry! We have encountered an error getting all the requests!');
    }
  }

  
  function handleSubmit(event) {
    getAllRequests()
  }




 useEffect(()=>{
    getAllRequests();
 },[decision])





  return (
    <div className = 'container'>
      <div className = 'title'>Home Page for {user.username}!</div>
      <div className = 'calendar-and-form-container'>
      <div className = 'calendar-and-button-container'>
        {requests.length > 0 ?
        <>
          <CalendarManager  requests={requests} getAllRequests = {getAllRequests} eventsDefined = {eventsDefined} setEvents = {setEvents} decision = {decision} setDecision = {setDecision}/>          
          <AddManagers requests= {requests} />      
        </>
        :null}
      </div>
      </div>
    </div>
  );
};

