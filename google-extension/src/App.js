// src/App.js
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Popup from "./pages/Popup";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Popup />
    </ThemeProvider>
  );
}

export default App;
