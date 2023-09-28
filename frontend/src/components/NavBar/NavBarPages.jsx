import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBarPages.css";

const NavBarPages = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
      <div className="navBar-pages">
      <div className='nav-container'>
      <ul>
        <li className="brand-pages">
          {user?.is_manager ? (
            <Link
              to="/manager"
              style={{ textDecoration: "none", color: "black"}}
            >
              <b>Same Page Time Tracker</b>
            </Link>
          ) : (
            <Link
              to="/employee"
              style={{ textDecoration: "none", color: "black"}}

            >
              <b>Same Page Time Tracker</b>
            </Link>
          )}
        </li>
        <li>
          {user ? (
            user.is_manager ? (
              <ul>
                <button
                  className="nav-button-pages"
                  onClick={() => navigate("/manager/manage-staff")}
                >
                  Manage Staff
                </button>
                <button
                  className="nav-button-pages"
                  onClick={() => navigate("/manager/add-employee")}
                >
                  Add Employee
                </button>
                <button
                  className="nav-button-pages"
                  onClick={() => navigate("/manager/settings")}
                >
                  Settings
                </button>
                <button className="nav-button" onClick={logoutUser}>
                  Logout
                </button>
              </ul>
            ) : (
              <button className="nav-button-pages" onClick={logoutUser}>
                LOG OUT
              </button>
            )
          ) : (
            <button onClick={() => navigate("/login")}>LOG IN</button>
          )}
        </li>
      </ul>
      </div>
    </div>
  );
};

export default NavBarPages;
