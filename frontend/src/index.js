import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { StyledEngineProvider } from '@mui/material/styles';

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
    
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
    
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
