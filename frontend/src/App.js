// General Imports
import { Routes, Route } from "react-router-dom";
import React, { useState} from 'react';
import useAuth from "./hooks/useAuth";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

// Pages Imports
import HomePageEmployee from "./pages/Employee/HomePageEmployee";
import HomePageManager from "./pages/Manager/HomePageManager";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ManageStaff from "./pages/Manager/ManageStaff";
import SettingsPage from "./pages/Manager/SettingsPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import axios from "axios";


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './media/PTSans-BoldItalic.ttf';
import './media/PTSans-Regular.ttf';


function App() {


const [user, token] = useAuth();
const [decision, setDecision] = useState();
const navigate = useNavigate();





  return (
    <div>
      <Navbar/>
      <ToastContainer
        autoClose={2500}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"/>

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
         <Route
          path="/manager/manage-staff"
          element={
            <PrivateRoute>
              <ManageStaff/>
            </PrivateRoute>} 
        />         
         <Route
          path="/manager/settings"
          element={
            <PrivateRoute>
              <SettingsPage/>
            </PrivateRoute>} 
        />         
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
