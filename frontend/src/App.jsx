import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Dashboard, LandOwners, Login, Signup, UploadCSV } from "./containers";
import LandOwnerDetails from "./containers/LandOwners/LandOwnerDetails";

const App = () => {
  return (
    <div>
      <Router>
        <CssBaseline />
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/uploadcsv" element={<UploadCSV />} />
          <Route path="/landowners" element={<LandOwners />} />
          <Route path="/landowners/:id" element={<LandOwnerDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
