// General Imports
import { Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import useAuth from "./hooks/useAuth";
import "./App.css";


// Pages Imports
import HomePageEmployee from "./pages/Employee/HomePageEmployee";
import HomePageManager from "./pages/Manager/HomePageManager";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import axios from "axios";



function App() {


const [user, token] = useAuth();
const [decision, setDecision] = useState();






  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
       
        <Route
          path="/manager"
          element={
            <PrivateRoute>
              <HomePageManager decision = {decision} setDecision = {setDecision}/>
            </PrivateRoute>} 
        />         
         {/* <Route
          path="/manager/manage-staff"
          element={
            <PrivateRoute>
              <ManageStaff/>
            </PrivateRoute>} 
        />          */}
        <Route
          path="/employee"
          element={
            <PrivateRoute>
              <HomePageEmployee decision = {decision} setDecision = {setDecision}/>
            </PrivateRoute> } 
          />  
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
