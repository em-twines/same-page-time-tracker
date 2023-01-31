import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <div className="container">
      <form className="form-container" onSubmit={handleSubmit}>
        <label className = 'item'>
          Username:{" "}
          <input 
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label className = 'item'>
          Password:{" "}
          <input 
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label >
        {isServerError ? (
          <p className="error">Login failed, incorrect credentials!</p>
        ) : null}
          <button className = 'same-page-button'>Login!</button>
          <Link className = 'same-page-link' to="/register">Click to register!</Link>
      
      </form>
    </div>
  );
};

export default LoginPage;
