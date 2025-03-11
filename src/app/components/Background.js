import React from "react";
import { Box } from "@mui/material";

// Component to handle background animation across all pages
const Background = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage:
          "linear-gradient(rgba(47, 59, 34, 0.5), rgba(4, 11, 1, 0.5)), url(/background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "0 0",
        backgroundRepeat: "repeat-x",
        zIndex: -1,
        animation: "scrollBackground 120s linear infinite",
      }}>
      <style>
        {`
      @keyframes scrollBackground {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `}
      </style>
    </Box>
  );
};

export default Background;
