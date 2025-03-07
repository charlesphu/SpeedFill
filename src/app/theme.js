"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // Color palette configuration
  palette: {
    // Text colors
    text: {
      main: "#edefdc", // Primary text color
      secondary: "#bac7b3", // Secondary/muted text
      google_text: "#4a4a4a", // Text for Google sign-in
    },

    // Background colors
    background: {
      default: "#1A1C0F", // Main app background
    },

    // Primary/Secondary theme colors
    primary: {
      main: "#d1d7a7", // Primary app color
    },
    secondary: {
      main: "#4D7940", // Secondary app color
    },

    // Accent colors for highlights
    accent: {
      main: "#598F54", // Main accent
      light: "#6CB073", // Lighter accent for hover states
    },

    // Title-specific colors
    title: {
      main: "#EDEFDE", // Main title color
      secondary: "#D2D7AC", // Secondary title (e.g., SpeedFill)
    },

    // Menu and interactive element colors
    menu: {
      main: "#4D7940", // Menu background
      textarea: "#598F54", // Text input areas
      button: "#4B8C3A", // Standard button
      submit_button: "#3A768C", // Submit actions
      button_hover: "#73b562", // Hover state for buttons
      submit_button_hover: "#569db8", // Hover for submit buttons
      google_hover: "#e3e3e3", // Google auth button hover
      google_border: "#8a8a8a", // Google auth button border

      // Submit action colors
      submit: {
        main: "#3A768C", // Base color
        hover: "#569DB8", // Hover state
      },

      // Destructive action colors (cancel/delete)
      destructive: {
        main: "#882424", // Base color
        hover: "#8C3A3A", // Hover state
      },
    },

    // General action colors
    action: {
      main: "#41693D", // Default action color
      hover: "#264522", // Hover state
    },
  },

  // Typography configuration
  typography: {
    fontFamily: "Roboto, sans-serif",

    // Title typography variants
    h1: {
      fontSize: "4.3rem", // Main app title
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.3rem", // Secondary title/tagline
      fontWeight: "550",
    },
    h3: {
      fontSize: "1.175rem", // Tertiary title/subtitle
      fontWeight: "400",
    },

    // Container header typography
    h4: {
      fontSize: "1.7rem", // Section headers
      fontWeight: "550",
    },
    subtitle1: {
      fontSize: "1.1rem", // Section subheaders
      fontWeight: "100",
    },

    // Content typography
    h5: {
      fontSize: "1.1rem", // Content titles
      fontWeight: "550",
    },
    body1: {
      fontSize: "1.1rem", // Body text
      fontWeight: "200",
    },
  },
});

export default theme;
