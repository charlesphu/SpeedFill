"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    text: {
      main: "#edefdc",
      secondary: "#bac7b3",
      google_text: "#4a4a4a",
    },
    background: {
      default: "#1A1C0F",
    },
    primary: {
      main: "#d1d7a7",
    },
    secondary: {
      main: "#4D7940",
    },
    accent: {
      main: "#598F54",
    },
    title: {
      main: "#EDEFDE",
      secondary: "#D2D7AC",
    },
    menu: {
      main: "#4D7940",
      textarea: "#598F54",
      button: "#4B8C3A",
      button_hover: "#73b562",
      google_hover: "#e3e3e3",
      google_border: "#8a8a8a",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",

    // These are the title sizes
    h1: {
      fontSize: "4.3rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.3rem",
      fontWeight: "550",
    },
    h3: {
      fontSize: "1.175rem",
      fontWeight: "400",
    },

    // These are the container body sizes
    h4: {
      fontSize: "1.7rem",
      fontWeight: "550",
    },
    subtitle1: {
      fontSize: "1.1rem",
      fontWeight: "100",
    },

    // Standard body title and text sizes
    h5: {
      fontSize: "1.1rem",
      fontWeight: "550",
    },

    body1: {
      fontSize: "1.1rem",
      fontWeight: "200",
    },
  },
});

export default theme;
