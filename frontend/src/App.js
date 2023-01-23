// General Imports
import { Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import useAuth from "./hooks/useAuth";
import "./App.css";
import 'bootstrap';

// Pages Imports
import HomePage_employee from "./pages/HomePage/HomePageEmployee";
import HomePage_manager from "./pages/HomePage/HomePageManager";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import axios from "axios";


function App() {


const[request_for_pto, setRequest] = useState({});
const [user, token] = useAuth();
const[requests_for_pto, setRequests] = useState([]);

async function getRequests(){

  try{
  let res = await axios.get(`http://127.0.0.1:8000/api/requests_for_pto/employee/`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  console.log(res.data);
    setRequests(res.data); 
  }
  catch (error) {
    console.log(error)
    alert('Sorry! We have encountered an error getting your requests!');
  }
}



  return (
    <div>
      <Navbar/>
      <Routes>
        {console.log(user)}
        <Route
          path="/manager"
          element={
            <PrivateRoute>
              <HomePage_manager setRequest = {setRequest} user = {user} token = {token} request_for_pto={request_for_pto} requests_for_pto = {requests_for_pto} setRequests = {setRequests}/>
            </PrivateRoute>} 
        />         

        <Route
          path="/employee"
          element={
            <PrivateRoute>
              <HomePage_employee setRequest = {setRequest} user = {user} token = {token} getRequests = {getRequests} request_for_pto ={request_for_pto}/>
            </PrivateRoute> } 
          />  

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
