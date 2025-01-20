'use client'
import React from 'react';
import sendPrompt from "./message_function"

// MUI
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';

export default function Home() {

	return (
		<Box>
		<Button 
			onClick={()=>sendPrompt("how do i get a job")}
			// onClick={()=>sendMessage("how do i get a job")}
			>
			Send
		</Button>

		<Typography
			variant="body1" // Equivalent to a <p> tag
			className="ai-output">
		</Typography>
		</Box>
	);
}