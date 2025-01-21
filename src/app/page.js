"use client";

import React from "react";

// MUI
import { Box } from "@mui/system";
import { Button } from "@mui/material";

import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import useAIPrompt from "../hooks/useAIPrompt";

export default function Home() {
  const { response, error, loading, sendPrompt } = useAIPrompt();

  return (
    <Box>
      <Button
        variant="contained"
        endIcon={<AutoAwesomeIcon />}
        onClick={() => sendPrompt("how do i get a job")}
        loading={loading}
        loadingPosition={"end"}>
        Ask AI
      </Button>

      <Typography variant="body1" className="ai-output">
        {response}
      </Typography>
    </Box>
  );
}
