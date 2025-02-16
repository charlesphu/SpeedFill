import { useState } from "react";
import { Box, Typography, TextField, useTheme } from "@mui/material";
import Divider from "../components/Divider";

const JobDescriptionUpload = ({ sx }) => {
    const theme = useTheme();
    const [jobUrl, setJobUrl] = useState("");
    const [jobText, setJobText] = useState("");

    return (
        <>
            <Box sx={{
                backgroundColor: theme.palette.menu.main,
                width: "100%",
                height: "100%",
                borderRadius: "20px",
                boxShadow: "0 0 20px 3px rgba(151, 231, 105, 0.2)",
                display: "flex",
                flexDirection: "column",
            }}>
                <Box sx={{
                    width: "100%",
                    height: "18%",
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "15px",
                    }}>
                        <Typography variant="h2" sx={{ color: "white" }}>
                            Job Description
                        </Typography>
                        <Typography variant="body2" sx={{ color: "white" }}>
                            Tell us a little about the job you're applying for
                        </Typography>
                    </Box>
                </Box>
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
                            height: "8vh",
                            width: "80%",
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
                <Box sx={{
                    width: "100%",
                    height: "10%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Divider />
                </Box>
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
                            width: "80%",
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

            </Box>
        </>
    );
};

export default JobDescriptionUpload;