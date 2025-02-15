import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, LinearProgress, TextField, useTheme, Button } from "@mui/material";
import Container from "../components/Container";
import Panel from "../components/Panel";
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
        <Container
            title="Your Resume"
            subtitle="Share your resume with us and let AI take a look"
            sx={{
                borderRadius: "30px",
                width: "100%",
                height: "100%",
                padding: "1.5rem",
                boxShadow: "0 0 50px 15px rgba(151, 231, 105, 0.2)",
                ...sx,
            }}
        >
            <Panel sx={{ border: "none", backgroundColor: "none", height: "200px", width: "100%", maxWidth: "900px", padding: "0px" }}>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    onClick={handleClick}
                    sx={{
                        width: "100%",
                        height: "100%",
                        border: "2px dashed white",
                        borderRadius: "20px",
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: theme.palette.accent.main,
                        padding: "10px",
                    }}
                >
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
                            <InsertDriveFile fontSize="large" sx={{ color: "white", marginBottom: "10px" }} />
                            <Typography variant="body1" sx={{ color: "white" }}>{fileName}</Typography>
                            <Button variant="text" color="secondary" onClick={handleClearResume} sx={{ color: "white", padding: "1px 7px", marginTop: "5px" }} disabled={isFileUploading}>
                                Clear File
                            </Button>
                            <Button variant="text" color="secondary" onClick={() => window.open(URL.createObjectURL(file), "_blank")} sx={{ color: "white", padding: "1px 7px" }} disabled={isFileUploading}>
                                Preview Document
                            </Button>
                        </>
                    ) : (
                        <>
                            <img src="/icons/download.svg" alt="icon" width={50} height={50} sx={{ color: "white"}} />
                            <Typography variant="body1" sx={{ color: "white" }} marginBottom="5px">
                                Drag and drop or <strong>Click to upload</strong>
                            </Typography>
                            <Typography variant="body2" sx={{ color: "white" }} color="textTertiary">
                                PDF, DOC, or DOCX (MAX. 5MB)
                            </Typography>
                        </>
                    )}
                </Box>
            </Panel>

            <Divider />

            <Panel sx={{ padding: "0px", border: "none", backgroundColor: "none", height: "200px", width: "100%", maxWidth: "900px", padding: "0px" }}>
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
                        height: "100%",
                        '& .MuiOutlinedInput-root': {
                            height: "100%",
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
            </Panel>
        </Container>
    );
};

export default ResumeUpload;