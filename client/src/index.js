import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/plus-jakarta-sans"; // Import from npm
import "./main.css";
import "./index.css";
import App from "./App";

// Create a custom theme with Plus Jakarta Sans
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Material-UI blue
    },
    secondary: {
      main: "#dc004e", // Material-UI pink
    },
    background: {
      default: "#f4f6f8", // Light gray for app background
    },
  },
  typography: {
    fontFamily: `"Plus Jakarta Sans", Roboto, Arial, sans-serif`, // Updated font family
  },
});

// Create root and render the app
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
