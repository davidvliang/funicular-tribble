import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createTheme,
  ThemeProvider,
  styled,
  useTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#37856d",
      dark: "#265D4C",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#4C49D4",
      dark: "#353394",
      contrastText: "#FFFFFF",
    },
    grey: {
      main: grey[600],
      dark: grey[800],
      contrastText: "#FFFFFF",
    },
    navigation: {
      main: "#FAFAFA",
      dark: "#AFAFAF",
      contrastText: "#000000",
    },
    error: {
      main: "#C2211E",
      dark: "#871715",
      contrastText: "#FFFFFF",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <App />
    </ThemeProvider>
  </React.StrictMode>
);
