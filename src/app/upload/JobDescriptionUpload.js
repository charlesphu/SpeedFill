import { useState } from "react";
import { Box, Typography, LinearProgress, TextField, useTheme } from "@mui/material";
import Container from "../components/Container";
import Panel from "../components/Panel";
import Divider from "../components/Divider";

const JobDescriptionUpload = ({ sx }) => {
    const theme = useTheme();
    return (
        <Container
            title="Job Description"
            subtitle="Tell us a little about the job you're applying for"
            sx={{
                borderRadius: "30px",
                width: "100%",
                height: "100%",
                padding: "1.5rem",
                boxShadow: "0 0 50px 15px rgba(151, 231, 105, 0.2)",
                ...sx,
            }}
        >
        </Container>

    );
};

export default JobDescriptionUpload;
