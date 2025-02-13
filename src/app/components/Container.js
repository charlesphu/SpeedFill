import { Box, Typography } from "@mui/material";
import React from "react";

const Container = ({ title, subtitle, sx, children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        boxShadow: "0px 4px 20px rgba(77, 121, 64, 0.4)",
        padding: "1rem",
        borderRadius: "5px",

        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "0.5rem",

        mx: "auto",
        maxWidth: "sm",

        ...sx,
      }}>
      <Typography variant="h4" color="title">
        {title}
      </Typography>
      <Typography variant="subtitle1" color="title" marginTop="-0.8rem">
        {subtitle}
      </Typography>
      {children}
    </Box>
  );
};

export default Container;
