import React, { useState , useEffect } from 'react';
import axios from 'axios';
import CalendarEmployee from '../../components/Calendar/CalendarEmployee';
import RequestForm from "../../components/RequestForm";
import useAuth from "../../hooks/useAuth";

const HomePageEmployee = ({decision, setDecision}) => {
  const [user, token] = useAuth();
  const[request_for_pto, setRequest] = useState({});
  const[requests_for_pto, setRequests] = useState([]);
  const[deletion, setDeletion] = useState(false);


  async function getRequests(){

    try{
    let res = await axios.get(`http://127.0.0.1:8000/api/requests_for_pto/employee/`,
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
      alert('Sorry! We have encountered an error getting your requests!');
    }
  }
  



  useEffect(()=>{
    getRequests();
   },[decision, deletion])
  

  return (
    <div className = 'container'>
      <div className = 'title'>Home Page for {user.username}!</div>
      <div className = 'calendar-and-form-container'>
        <RequestForm setRequest = {setRequest} user = {user} token = {token} getRequests = {getRequests}/>
        <CalendarEmployee decision = {decision} setDecision = {setDecision} requests_for_pto = {requests_for_pto} deletion = {deletion} setDeletion = {setDeletion} getRequests = {getRequests}/>
        
      </div>
    </div>
  );
};

export default HomePageEmployee;

