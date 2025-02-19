import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  LinearProgress,
  TextField,
  useTheme,
  Button,
} from "@mui/material";
import Container from "../components/Container";
import Panel from "../components/Panel";
import Divider from "../components/Divider";
import { uploadPDF } from "../firebase/storage";
const ResumeUpload = ({ resumeData, setResumeData, sx }) => {
  const [isFileUploading, setIsFileUploading] = useState(false);

  const theme = useTheme();

  const uploadResume = (file) => {
    setIsFileUploading(true);
    setResumeData({ ...resumeData, file });

    const timer = setTimeout(() => {
      setIsFileUploading(false);
    }, 2000);
    // console.log("uploaded");
    console.log(file);
    uploadPDF(file, "resume");
    // uploadPDF()
  };

  const handleClearResume = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setResumeData({ file: null, text: "" });
    setIsFileUploading(false);
  };

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
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
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
      title="Upload Your Resume"
      subtitle="Share your resume with us and let AI take a look"
      sx={{ maxWidth: "none", width: "40rem", borderRadius: "20px", ...sx }}>
      <Panel sx={{ border: "none", backgroundColor: "none" }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            border: "2px dashed white",
            borderRadius: "20px",
            padding: "1rem",
            backgroundColor: theme.palette.accent.main,
            cursor: "pointer",
          }}
          onClick={handleClick}>
          <Box {...getRootProps()}>
            <input {...getInputProps()} disabled={isFileUploading} />
          </Box>
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
                width={30}
                height={30}
                sx={{ color: "white" }}
              />
              <Typography
                variant="body1"
                sx={{ fontSize: "0.6rem", color: "white" }}
                marginBottom="5px">
                Drag and drop or <strong>Click to upload</strong>
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "0.5rem", color: "white" }}
                color="textTertiary">
                PDF, DOC, or DOCX (MAX. 5MB)
              </Typography>
            </>
          )}
        </Box>
      </Panel>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Divider />
      </Box>

      <Panel sx={{ border: "none", backgroundColor: "none" }}>
        <TextField
          placeholder="Or type your resume here..."
          multiline
          rows={6}
          fullWidth
          variant="outlined"
          value={resumeData.text}
          onChange={(e) =>
            setResumeData({ ...resumeData, text: e.target.value })
          }
          sx={{
            backgroundColor: theme.palette.accent.main,
            color: "white",
            border: "1px solid white",
            borderRadius: "20px",
            "& .MuiOutlinedInput-root": {
              fontSize: "0.7rem",
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
      </Panel>
    </Container>
  );
};

export default ResumeUpload;
