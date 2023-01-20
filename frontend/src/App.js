// General Imports
import { Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import useAuth from "./hooks/useAuth";
import "./App.css";
import 'bootstrap';

// Pages Imports
import HomePage_employee from "./pages/HomePage/HomePage_employee";
import HomePage_manager from "./pages/HomePage/HomePage_manager";
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
    setRequest(res.data); 
  }
  catch (error) {
    console.log(error)
    alert('Sorry! We have encountered an error getting your requests!');
  }
}


  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/managers"
          element={
            <PrivateRoute>
              <HomePage_manager setRequest = {setRequest} user = {user} token = {token}/>
            </PrivateRoute>
          }
        />          
        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <HomePage_employee setRequest = {setRequest} user = {user} token = {token} getRequests = {getRequests}/>
            </PrivateRoute> } 
          />  
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
