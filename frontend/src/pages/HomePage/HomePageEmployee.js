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

// The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
// The "token" value is the JWT token that you will send in the header of any request requiring authentication
// Add an AddCars Page to add a car for a logged in user's garage
// const [user, token] = useAuth();
// const [cars, setCars] = useState([]);

// useEffect(() => {
//   const fetchCars = async () => {
//     try {
//       let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       });
//       setCars(response.data);
//     } catch (error) {
//       console.log(error.response.data);
//     }
//   };
//   fetchCars();
// }, [token]);

//   <div className="container">
//     <h1>Home Page for {user.username}!</h1>
//     {cars &&
//       cars.map((car) => (
//         <p key={car.id}>
//           {car.year} {car.model} {car.make}
//         </p>
//       ))}
//   </div>
// );
