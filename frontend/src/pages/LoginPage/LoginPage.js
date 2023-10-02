import React, { useContext, useEffect, Fragment } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import { useForm } from "react-hook-form"

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    }
  })

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);


  return (
    <Fragment>
      <div className="register--background">
        <div className="register--grid">
          <div className="register--circle-1"></div>
          <div className="register--circle-2"></div>
          <div className="register--circle-3"></div>
          <div className="register--circle-4"></div>
          <div className="register--circle-5"></div>
          <div className="register--circle-6"></div>

          <div className="register--container">
            <div className="login--tv">
              <form className="form-container" onSubmit={handleSubmit(loginUser)}>
                <label className="item">
                  Username:{" "}
                  <input
                    className="item-input"
                    type="text"
                    name="username"
                    {...register('username', {
                      required: "Please enter your username.",
                    })}
                  />
                </label>
                <label className="item">
                  Password:{" "}
                  <input
                    className="item-input"
                    type="text"
                    name="password"
                    {...register('password', {
                      required: "Please enter your password.",
                    })}
                  />
                </label>
                {isServerError ? (
                  <p className="error">Login failed, incorrect credentials!</p>
                ) : null}
                <button type='submit' className="same-page-button">Login!</button>
                <Link className="same-page-link" to="/register">
                  Click to register!
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginPage;
