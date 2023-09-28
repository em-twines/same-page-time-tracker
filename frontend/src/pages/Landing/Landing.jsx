import React, { Fragment, useContext, useEffect } from "react";
// import AuthContext from "../../context/AuthContext";
// import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import "./Landing.css";

const Landing = () => {
  return (
    <Fragment>
      <NavBar />
      <div className="component-container">
        <div className="circles-grid">
          <div className="circle-1"></div>
          <h1 className="splash-large-1">
            Get on the <br></br>same page...
          </h1>
          <h2 className="splash-medium">
            {" "}
            Manage PTO<br></br>for yourself and your team, all in one place.
          </h2>
          <div className="circle-2"></div>
          <h1 className="splash-large-2">...and get on with your day.</h1>
        </div>
      </div>
    </Fragment>
  );
};
export default Landing;
