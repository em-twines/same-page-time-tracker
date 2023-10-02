import React, { Fragment, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./RegisterPage.css";
import { useForm } from "react-hook-form"

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      state: "",
    }
  });

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
            <div className="tv">
              <form className="form-container" onSubmit={handleSubmit(registerUser)}>
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
                  First Name:{" "}
                  <input
                    className="item-input"
                    type="text"
                    name="firstName"
                    {...register('firstName', {
                      required: "Please enter your first name.",
                    })}
                  />
                </label>
                <label className="item">
                  Last Name:{" "}
                  <input
                    className="item-input"
                    type="text"
                    name="lastName"
                    {...register('lastName', {
                      required: "Please enter your last name.",
                    })}
                  />
                </label>
                <label className="item">
                  State:{" "}
                  <input
                    className="item-input"
                    type="text"
                    name="state"
                    {...register('state', {
                      required: "Please enter your state of residence.",
                    })}
                  />
                </label>
                <label className="item">
                  Email:{" "}
                  <input
                    className="item-input"
                    type="email"
                    name="email"
                    {...register('email', {
                      required: "Please enter your work email address.",
                    })}
                  />
                </label>
                <label className="item">
                  Password:{" "}
                  <input
                    className="item-input"
                    type="password"
                    name="password"
                    {...register('password', {
                      required: "Please enter a strong password.",
                    })}
                  />
                </label>
                <p style={{ fontSize: "12px" }}>
                  NOTE: Make this an uncommon password with characters, numbers,
                  and special characters.
                </p>
                <button type='submit' className="same-page-button">Register!</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterPage;
