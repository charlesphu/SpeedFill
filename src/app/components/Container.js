import { Box, Typography } from "@mui/material";
import React from "react";

const Container = ({ title, subtitle, children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        boxShadow: "0px 4px 20px rgba(77, 121, 64, 0.4)",
        padding: "1rem",
        borderRadius: "5px",
        margin: "0 auto",
        marginTop: "4rem",
        width: "40%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
      <Typography variant="h4" color="title">
        {title}
      </Typography>
      <Typography variant="h5" color="title" sx={{ marginTop: "0.2rem" }}>
        {subtitle}
      </Typography>
      {children}
    </Box>
  );
};

export default Container;
