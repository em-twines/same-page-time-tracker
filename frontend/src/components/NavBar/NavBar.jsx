import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user); 
  return (
    <div className="navBar">
      <div className="container">
        <ul>
          <li className="brand">
            {user?.is_manager ? (
              <Link
                to="/manager"
                style={{ textDecoration: "none", color: "black" }}
              >
                <b>Same Page<small style={{color: 'white'}}> Time Tracker</small></b>
              </Link>
            ) : (
              <Link
                to="/employee"
                style={{ textDecoration: "none", color: "black" }}
              >
                <b>Same Page<small style={{color: 'white'}}> Time Tracker</small></b>
              </Link>
            )}
          </li>
          <li>
            {user ? (
              user.is_manager ? (
                <ul>
                  <button
                    className="nav-button"
                    onClick={() => navigate("/manager/manage-staff")}
                  >
                    MANAGE STAFF
                  </button>
                  <button
                    className="nav-button"
                    onClick={() => navigate("/manager/add-employee")}
                  >
                    ADD EMPLOYEES
                  </button>
                  <button
                    className="nav-button"
                    onClick={() => navigate("/manager/settings")}
                  >
                    SETTINGS
                  </button>
                  <button className="nav-button" onClick={logoutUser}>
                    LOG OUT
                  </button>
                </ul>
              ) : (
                <button className="nav-button" onClick={logoutUser}>
                  LOG IN
                </button>
              )
            ) : (
              <button onClick={() => navigate("/login")}>LOG IN</button>
            )}
          </li>
        </ul>
        <div className="line" />
      </div>
    </div>
  );
};

export default Navbar;
