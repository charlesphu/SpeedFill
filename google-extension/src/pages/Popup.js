import React from "react";
import { Box, Button, Typography, Card, CardContent } from "@mui/material";

function Popup() {
  console.log("Loading Popup Component");

  const openWebapp = () => {
    chrome.tabs.create({
      url: "https://speed-fill-git-main-charlesphus-projects.vercel.app/auth",
    });
  };

  const readPageText = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["contentScript.js"],
      });
    });
  };

  return (
    <Box sx={{ width: "300px", p: 2, bgcolor: "background.paper" }}>
      <Typography variant="h1" color="text.primary" align="center" gutterBottom>
        SpeedFill
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mb: 2 }}>
        Seamless Job Applications, Every Time
      </Typography>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={openWebapp}>
            Open Web App
          </Button>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={readPageText}>
            Extract Job Description
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Popup;
