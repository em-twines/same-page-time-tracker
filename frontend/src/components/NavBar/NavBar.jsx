import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          {user?.is_manager?(
          <Link to="/manager" style={{ textDecoration: "none", color: "white" }}>
            <b>Same Page Time Tracker</b>
          </Link>):(  
          <Link to="/employee" style={{ textDecoration: "none", color: "white" }}>
            <b>Same Page Time Tracker</b>
          </Link>
          )}
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
