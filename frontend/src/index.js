import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css'
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { ProSidebarProvider } from "react-pro-sidebar";

ReactDOM.render(
  <React.StrictMode>

      <StyledEngineProvider injectFirst>
        <Router>    
          <AuthProvider>
            <ProSidebarProvider>
            <App /> 
            </ProSidebarProvider>
          </AuthProvider>
        </Router>
      </StyledEngineProvider>
   
  </React.StrictMode>,
  document.getElementById("root")
);
