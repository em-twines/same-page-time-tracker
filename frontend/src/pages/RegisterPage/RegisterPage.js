import React, { Fragment, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import "./RegisterPage.css";
import Box from "@mui/material/Box";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    state: "",
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (
    <Fragment>
      <div className="register--background">
        {/* <div className='register--background-clear'> */}
        <div className="register--grid">
          <div className="register--circle-1"></div>
          <div className="register--circle-2"></div>
          {/* <div className="push-navBar"></div> */}
          {/* <div className="register--left-circles-container"> */}
          <div className="register--circle-3"></div>
          <div className="register--circle-4"></div>
          <div className="register--circle-5"></div>
          <div className="register--circle-6"></div>

          <div className="register--container">
            <div className="tv">
              <form className="form-container" onSubmit={handleSubmit}>
                <label className="item">
                  Username:{" "}
                  <input
                    className="item-input"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="item">
                  First Name:{" "}
                  <input
                    className="item-input"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="item">
                  Last Name:{" "}
                  <input
                    className="item-input"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="item">
                  State:{" "}
                  <input
                    className="item-input"
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="item">
                  Email:{" "}
                  <input
                    className="item-input"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="item">
                  Password:{" "}
                  <input
                    className="item-input"
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </label>
                <p style={{ fontSize: "12px" }}>
                  NOTE: Make this an uncommon password with characters, numbers,
                  and special characters!
                </p>
                <button className="same-page-button">Register!</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </Fragment>
  );
};

// const styles = {
//   tv: {
//     display: "flex",
//     width: '80%',
//     maxHeight: '80vh',
//     margin: 2,
//     borderRadius: 25,
//     borderWidth: 1,
//     backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(90deg,  #2812d0, #e27d60)',
//     boxShadow: '1 1000 1 white inset',
//     alignItems: "center",
//     justifyContent: 'center',
//   }
// };
export default RegisterPage;
