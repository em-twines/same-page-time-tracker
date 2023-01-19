import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";


import Calendar from "../../components/Calendar/Calendar.jsx";


const HomePage_employee = () => {
  
  const [user, token] = useAuth();

  return (
    <div className = 'container'>
      <h1>Home Page for {user.username}!</h1>
      <Calendar/>
    </div>
  );
};

export default HomePage_employee;

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
