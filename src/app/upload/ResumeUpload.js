import {
  Box,
  Typography,
  LinearProgress,
  TextField,
  useTheme,
  Button,
} from "@mui/material";

import Container from "../components/Container";
import Divider from "../components/Divider";

import {
  setCurrentResume,
  getCurrentResume,
} from "../hooks/supabase/uploadfile";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

// Section component to display resume upload functionality
const ResumeUpload = ({ resumeData, setResumeData, sx }) => {
  const theme = useTheme();

  // State to manage file upload status
  const [isFileUploading, setIsFileUploading] = useState(false);

  useEffect(() => {
    // Load default resume when the component mounts
    const loadDefaultResume = async () => {
      const storedResumeURL = await getCurrentResume(); // Fetch from Supabase
      if (storedResumeURL) {
        setIsFileUploading(true);

        const resumeFetch = await fetch(storedResumeURL);
        const resumeBlob = await resumeFetch.blob();
        const resume = new File([resumeBlob], "currentResume.pdf", {
          type: resumeBlob.type,
        });

        uploadResume(resume);
      }
    };

    loadDefaultResume();
  }, [setResumeData]);

  // Function to handle file upload
  const uploadResume = (file) => {
    setIsFileUploading(true);
    setResumeData({ ...resumeData, file });
    setCurrentResume(file); // //--> needs to only set if the user wants it to be set

    const timer = setTimeout(() => {
      setIsFileUploading(false);
    }, 2000);
  };

  // Function to clear the uploaded resume
  const handleClearResume = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setResumeData({ file: null, text: "" });
    setIsFileUploading(false);
  };

  // Function to handle file drop using react-dropzone
  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      return;
    }

    if (resumeData.file && !isFileUploading) {
      handleClearResume();
    }

    uploadResume(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
    },
    maxSize: 5242880,
    disabled: isFileUploading,
  });

  // Function to handle click event on the upload area
  const onUploadButtonClick = () => {
    if (!isFileUploading) {
      open();
    }
  };

  return (
    <Container
      title="Upload Your Resume"
      subtitle="Share your resume with us and let AI take a look"
      sx={{ ...sx }}>
      {/* Upload area for resume file */}
      <Box
        {...getRootProps()}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="0.3rem"
        minHeight="9rem"
        sx={{
          border: "2px dashed white",
          borderRadius: "5px",
          padding: "1rem",
          backgroundColor: theme.palette.accent.main,
          cursor: "pointer",
        }}
        onClick={onUploadButtonClick}>
        <input {...getInputProps()} disabled={isFileUploading} />
        {isFileUploading ? (
          <>
            <Typography
              variant="body1"
              sx={{ color: "white" }}
              marginTop="10px">
              Uploading...
            </Typography>
            <LinearProgress sx={{ width: "30%", marginTop: "10px" }} />
          </>
        ) : resumeData.file ? (
          <>
            <Typography variant="body1" sx={{ color: "white" }}>
              {resumeData.file.name}
            </Typography>
            <Button
              variant="text"
              color="secondary"
              onClick={handleClearResume}
              sx={{
                fontSize: "0.7rem",
                color: "white",
                padding: "1px 7px",
                marginTop: "5px",
              }}
              disabled={isFileUploading}>
              Clear File
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={() =>
                window.open(URL.createObjectURL(resumeData.file), "_blank")
              }
              sx={{ fontSize: "0.7rem", color: "white", padding: "1px 7px" }}
              disabled={isFileUploading}>
              Preview Document
            </Button>
          </>
        ) : (
          <>
            <img
              src="/icons/download.svg"
              alt="icon"
              width={45}
              height={45}
              sx={{ color: "white" }}
            />
            <Typography variant="body1" color="title">
              Drag and drop or <strong>Click to upload</strong>
            </Typography>
            <Typography variant="body2" color="title">
              PDF (MAX. 5MB)
            </Typography>
          </>
        )}
      </Box>

      {/* Divider to separate URL input from text area */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Divider width="60%" verticalMargin="-0.3rem" />
      </Box>

      {/* Text area for resume input */}
      <TextField
        placeholder="Or paste your resume here..."
        multiline
        rows={5}
        fullWidth
        variant="outlined"
        value={resumeData.text}
        onChange={(e) => setResumeData({ ...resumeData, text: e.target.value })}
        sx={{
          backgroundColor: theme.palette.accent.main,
          color: "white",
          border: "1px solid white",
          borderRadius: "5px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent",
            },
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "white",
          },
        }}
      />
    </Container>
  );
};

export default ResumeUpload;
