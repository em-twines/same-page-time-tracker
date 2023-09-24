// General Imports
import { Routes, Route } from "react-router-dom";
import React, { useState, Fragment } from "react";
import useAuth from "./hooks/useAuth";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";


// Pages Imports
import HomePageEmployee from "./pages/Employee/HomePageEmployee";
import HomePageManager from "./pages/Manager/HomePageManager";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ManageStaff from "./pages/Manager/ManageStaff";
import SettingsPage from "./pages/Manager/SettingsPage";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import AddEmployeePage from "./pages/Manager/AddEmployeePage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import axios from "axios";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./media/PTSans-BoldItalic.ttf";
import "./media/PTSans-Regular.ttf";

function App() {
  const [user, token] = useAuth();
  const [decision, setDecision] = useState();
  const navigate = useNavigate();


// TODO: add drop down menu to log in / register
// TODO: create path to get from landing to log in / register


  
  return (
    <Fragment>
      <Navbar />

      <ToastContainer
        autoClose={2500}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/manager"
          element={
            <PrivateRoute>
              <HomePageManager decision={decision} setDecision={setDecision} />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/manage-staff"
          element={
            <PrivateRoute>
              <ManageStaff />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/add-employee"
          element={
            <PrivateRoute>
              <AddEmployeePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <PrivateRoute>
              <HomePageEmployee decision={decision} setDecision={setDecision} />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
