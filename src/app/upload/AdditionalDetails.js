import { useState } from "react";
import { Box, Typography, TextField, useTheme } from "@mui/material";
import Divider from "../components/Divider";

const AdditionalDetails = ({ sx }) => {
    const theme = useTheme();
    const [questions, setQuestions] = useState("");

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
                            Additional Details
                        </Typography>
                        <Typography variant="body2" sx={{ color: "white" }}>
                            Anything else you'd like us to cover?
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    width: "100%",
                    height: "82%",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                }}>
                    <TextField
                        placeholder="Ask questions or add details (like relevant experience) here..."
                        multiline
                        rows={6}
                        fullWidth
                        variant="outlined"
                        value={questions}
                        onChange={(e) => setQuestions(e.target.value)}
                        sx={{
                            backgroundColor: theme.palette.accent.main,
                            color: "white",
                            border: "1px solid white",
                            borderRadius: "20px",
                            height: "35vh",
                            width: "90%",
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

export default AdditionalDetails;