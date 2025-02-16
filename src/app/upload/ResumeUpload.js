import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, LinearProgress, TextField, useTheme, Button } from "@mui/material";
import Divider from "../components/Divider";

const ResumeUpload = ({ sx }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [isFileUploading, setIsFileUploading] = useState(false);
    const [textResume, setTextResume] = useState("");


    const theme = useTheme();

    const uploadResume = (file) => {
        setIsFileUploading(true);
        setFileName(file.name);
        setFile(file);

        const timer = setTimeout(() => {
            setIsFileUploading(false);
        }, 2000);
    };


    const handleClearResume = (e) => {
        if (e) {
            e.stopPropagation();
        }
        setFileName("");

        setIsFileUploading(false);
        setFile(null);
    };

    const onDrop = (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            return;
        }

        if (fileName && !isFileUploading) {
            handleClearResume();
        }

        uploadResume(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [],
            "application/msword": [],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
        },
        maxSize: 5242880,
        disabled: isFileUploading,
    });

    const handleClick = () => {
        if (!isFileUploading) {
            open();
        }
    };

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
                            Your Resume
                        </Typography>
                        <Typography variant="body2" sx={{ color: "white" }}>
                            Share your resume with us and let AI take a look
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    width: "100%",
                    height: "35%",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                }}>
                    <Box
                        onClick={handleClick}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px dashed white",
                            borderRadius: "20px",
                            width: "80%",
                            height: "15vh",
                            backgroundColor: theme.palette.accent.main,
                            cursor: "pointer",
                        }}>
                        <Box {...getRootProps()} display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
                            <input {...getInputProps()} disabled={isFileUploading} />
                        </Box>
                        {isFileUploading ? (
                            <>
                                <Typography variant="body1" sx={{ color: "white" }} marginTop="10px">
                                    Uploading...
                                </Typography>
                                <LinearProgress sx={{ width: "30%", marginTop: "10px" }} />
                            </>
                        ) : fileName ? (
                            <>
                                <Typography variant="body1" sx={{ color: "white" }}>{fileName}</Typography>
                                <Button variant="text" color="secondary" onClick={handleClearResume} sx={{ fontSize: "0.7rem", color: "white", padding: "1px 7px", marginTop: "5px" }} disabled={isFileUploading}>
                                    Clear File
                                </Button>
                                <Button variant="text" color="secondary" onClick={() => window.open(URL.createObjectURL(file), "_blank")} sx={{ fontSize: "0.7rem", color: "white", padding: "1px 7px" }} disabled={isFileUploading}>
                                    Preview Document
                                </Button>
                            </>
                        ) : (
                            <>
                                <img src="/icons/download.svg" alt="icon" width={30} height={30} sx={{ color: "white" }} />
                                <Typography variant="body1" sx={{ fontSize: "0.6rem", color: "white" }} marginBottom="5px">
                                    Drag and drop or <strong>Click to upload</strong>
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: "0.5rem", color: "white" }} color="textTertiary">
                                    PDF, DOC, or DOCX (MAX. 5MB)
                                </Typography>
                            </>
                        )}
                    </Box>
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
                    height: "35%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <TextField
                        placeholder="Or type your resume here..."
                        multiline
                        rows={6}
                        fullWidth
                        variant="outlined"
                        value={textResume}
                        onChange={(e) => setTextResume(e.target.value)}
                        sx={{
                            backgroundColor: theme.palette.accent.main,
                            color: "white",
                            border: "1px solid white",
                            borderRadius: "20px",
                            height: "16vh",
                            width: "80%",
                            '& .MuiOutlinedInput-root': {
                                fontSize: "0.7rem",
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

export default ResumeUpload;