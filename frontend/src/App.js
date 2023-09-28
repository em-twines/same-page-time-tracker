// General Imports
import { Routes, Route, Router } from "react-router-dom";
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
import LandingPage from "./pages/Landing/Landing.jsx";
import AddEmployeePage from "./pages/Manager/AddEmployeePage";

// Component Imports
import NavBar from "./components/NavBar/NavBar"
import NavBarPages from "./components/NavBar/NavBarPages.jsx";
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

//  TODO: make login / register modals of the same page.

function App() {
  const [user, token] = useAuth();
  const [decision, setDecision] = useState();
  const navigate = useNavigate();

  return (
    <Fragment>
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

        {/* {!user?.username ? ( */}
          <>
            <Route
              path="/login"
              element={
                <Fragment>
                  <NavBar />
                  <LoginPage />
                </Fragment>
              }
            />
            <Route
              path="/register"
              element={
                <Fragment>
                  <NavBar />
                  <RegisterPage />
                </Fragment>
              }
            />
          </>
        {/* ) : ( */}
          <>
            <Route
              path="/manager"
              element={
                <PrivateRoute>
                  <Fragment>
                  <NavBarPages />
                  <HomePageManager
                    decision={decision}
                    setDecision={setDecision} />
                  </Fragment>
                </PrivateRoute>
              }
            >
            <Route
              exact
              path="/manager/manage-staff"
              element={
                <PrivateRoute>
                   <Fragment>
                  <NavBarPages />
                  <ManageStaff />
                  </Fragment>
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/manager/add-employee"
              element={
                <PrivateRoute>
                   <Fragment>
                  <NavBarPages />
                  <AddEmployeePage />
                  </Fragment>
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/manager/settings"
              element={
                <PrivateRoute>
                   <Fragment>
                  <NavBarPages />
                  <SettingsPage />
                  </Fragment>
                </PrivateRoute>
              }
            />
            </Route>
            <Route
              path="/employee"
              element={
                <PrivateRoute>
                   <Fragment>
                  <NavBarPages />
                  <HomePageEmployee
                    decision={decision}
                    setDecision={setDecision}
                  />
                  </Fragment>
                </PrivateRoute>
              }
            />
          </>
        {/* )} */}
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
