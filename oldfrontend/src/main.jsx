import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { theme } from "./components";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer closeOnClick />
      <App />
    </ThemeProvider>
  </StrictMode>
);
