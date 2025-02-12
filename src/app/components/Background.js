import React from "react";
import { Box, useTheme } from "@mui/material";

const Background = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: theme.palette.primary.default,
        backgroundImage: "url(/background.jpg)",
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
