import { useState } from "react";
import { Box, Typography, TextField, useTheme } from "@mui/material";
import Divider from "../components/Divider";
import Container from "../components/Container";
import Panel from "../components/Panel";

const JobDescriptionUpload = ({ sx }) => {
    const theme = useTheme();
    const [jobUrl, setJobUrl] = useState("");
    const [jobText, setJobText] = useState("");

    return (
        <Container title="Job Description" subtitle="Tell us a little about the job you're applying for" sx={{ maxWidth:"none", width: "40rem", borderRadius:"20px", ...sx }}>
            <Panel sx={{border: "none", backgroundColor: "none"}}>
                <Box sx={{
                    width: "100%",
                    height: "20%",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                }}>
                    <TextField
                        placeholder="Paste the job application URL here..."
                        fullWidth
                        variant="outlined"
                        value={jobUrl}
                        onChange={(e) => setJobUrl(e.target.value)}
                        sx={{
                            backgroundColor: theme.palette.accent.main,
                            color: "white",
                            border: "1px solid white",
                            borderRadius: "10px",
                            justifyContent: "center",
                            height: "4rem",
                            width: "100%",
                            '& .MuiOutlinedInput-root': {
                                fontSize: "0.9rem",
                                '& fieldset': {
                                    borderColor: "transparent",
                                },
                                '&:hover fieldset': {
                                    borderColor: "transparent",
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: "transparent",
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: "white",
                            },
                            '& .MuiInputLabel-root': {
                                color: "white",
                            },
                            '& .MuiInputBase-input::placeholder': {
                                color: "white",
                            },
                        }}
                    />
                </Box>
            </Panel>

            <Box sx={{
                width: "100%",
                height: "10%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Divider />
            </Box>
            <Panel sx={{border: "none", backgroundColor: "none"}}>
                <Box sx={{
                    width: "100%",
                    height: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <TextField
                        placeholder="Or paste the job description here..."
                        multiline
                        rows={6}
                        fullWidth
                        variant="outlined"
                        value={jobText}
                        onChange={(e) => setJobText(e.target.value)}
                        sx={{
                            backgroundColor: theme.palette.accent.main,
                            color: "white",
                            border: "1px solid white",
                            borderRadius: "20px",
                            height: "23vh",
                            '& .MuiOutlinedInput-root': {
                                fontSize: "0.8rem",
                                '& fieldset': {
                                    borderColor: "transparent",
                                },
                                '&:hover fieldset': {
                                    borderColor: "transparent",
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: "transparent",
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: "white",
                            },
                            '& .MuiInputLabel-root': {
                                color: "white",
                            },
                            '& .MuiInputBase-input::placeholder': {
                                color: "white",
                            },
                        }}
                    />
                </Box>
            </Panel>
        </Container>
    );
};

export default JobDescriptionUpload;
