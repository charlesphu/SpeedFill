import { Box, Typography } from "@mui/material";
import React from "react";

const Container = ({ title, subtitle, sx, children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        boxShadow: "0px 4px 20px rgba(77, 121, 64, 0.4)",
        padding: "1.5rem",
        borderRadius: "5px",

        maxWidth: "sm",
        width: "100%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "top",

        gap: "1.2rem",
        alignSelf: "flex-start",

        ...sx,
      }}>
      <Typography variant="h4" color="title">
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        color="title"
        marginTop="-1.4rem"
        marginBottom="-0.5rem">
        {subtitle}
      </Typography>
      {children}
    </Box>
  );
};

export default Container;
