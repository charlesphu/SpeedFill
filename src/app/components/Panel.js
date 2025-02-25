"use client";

import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";

const Panel = ({ sx, children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: "accent.main",
        padding: "0.8rem",

        borderRadius: "5px",
        border: "1px solid " + theme.palette.primary.main,

        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",

        mx: "auto",
        maxWidth: "sm",

        ...sx,
      }}>
      {children}
    </Box>
  );
};

export default Panel;
