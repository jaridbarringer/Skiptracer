import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Dashboard, Login, Signup } from "./containers";

const App = () => {
  return (
    <div>
      <Router>
        <CssBaseline />
        <Routes>
          {/* Default route that redirects to sign in page if not authenticated */}
          {/* <Route
      path="/"
      element={
        isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />
      }
    /> */}

          {/* Route for the dashboard */}
          {/* <Route
      path="/dashboard"
      element={
        isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />
      }
    /> */}

          {/* Route for the sign-in page */}
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
