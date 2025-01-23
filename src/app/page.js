"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
// MUI
import { Box } from "@mui/system";
import { Button, Divider, TextField } from "@mui/material";

import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LinkIcon from "@mui/icons-material/Link";
import { FileUpload } from "@mui/icons-material";

// AI prompt
import useAIPrompt from "../hooks/useAIPrompt";

export default function Home() {
  const { response, error, loading, sendPrompt } = useAIPrompt();

  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [applicationQuestion, setApplicationQuestion] = useState("");

  const handleSubmit = () => {
    const prompt = `Resume: ${resumeText}\nJob Description: ${jobDescription}\nApplication Question: ${applicationQuestion}`;
    sendPrompt(prompt);
  };

  const onDrop = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = (e) => setResumeText(e.target.result);
    reader.readAsText(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
    maxSize: 5242880,
  });

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingTop="1.25rem"
        paddingBottom="2.5rem"
        elevation={0}>
        <Typography variant="h1" fontWeight="bold" marginBottom="0.625rem">
          SpeedFill
        </Typography>
        <Typography variant="h5" marginBottom="0.625rem" color="textSecondary">
          Seamless Job Applications, Every Time.
        </Typography>
        <Typography variant="body1" color="textSecondary" marginTop="0.125rem">
          Upload your resume and let AI help you land your dream job!
        </Typography>

        <Box
          style={{
            boxShadow:
              "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
          }}
          display="flex"
          flexDirection="column"
          padding="1.25rem"
          bgcolor="#212121"
          borderRadius="0.5rem"
          width="80%"
          maxWidth="50rem"
          marginTop="1.25rem">
          <Typography variant="h5" fontWeight="medium">
            Your Resume
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            marginTop="0.125rem"
            marginBottom="1rem">
            Share your resume with us and AI will take a look
          </Typography>
          <Box display="flex" flexDirection="row">
            <Box
              flex="1"
              marginRight="0.5rem"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              border="2px dashed"
              borderRadius="8px"
              bgcolor="#282828"
              color="#999"
              textAlign="center"
              style={{ cursor: "pointer" }}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <FileUpload
                style={{ fontSize: "3rem", marginBottom: "0.625rem" }}
              />
              <Typography variant="body1" marginBottom="0.3125rem">
                Drag and drop or <strong>Click to upload</strong>
              </Typography>
              <Typography variant="body2" color="textTertiary">
                PDF, DOC or DOCX (MAX. 5MB)
              </Typography>
            </Box>
            <Box
              flex="1"
              marginLeft="1rem"
              display="flex"
              flexDirection="column">
              <TextField
                multiline
                rows={8}
                variant="outlined"
                fullWidth
                placeholder="Or paste your resume content here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            </Box>
          </Box>

          <Divider style={{ marginTop: "1.25rem", marginBottom: "0.9rem" }} />

          <Typography variant="h5" fontWeight="medium">
            Job Description
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            marginTop="0.125rem"
            marginBottom="1rem">
            Tell us a little about the job you're applying for
          </Typography>
          <Box display="flex" flexDirection="row">
            <TextField
              variant="outlined"
              placeholder="Paste the job application URL here"
              style={{ flex: 1, marginRight: "0.8rem" }}
            />
            <Button
              color="link"
              variant="outlined"
              style={{ minWidth: "3rem" }}>
              <LinkIcon fontSize="medium" />
            </Button>
          </Box>
          <Divider
            style={{
              width: "50%",
              margin: "0.5rem auto 0.5rem auto",
            }}>
            <span style={{ color: "#999" }}>OR</span>
          </Divider>
          <TextField
            variant="outlined"
            rows={5}
            multiline
            placeholder="Paste the job description here"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <Divider style={{ marginTop: "1.25rem", marginBottom: "0.9rem" }} />

          <Typography variant="h5" fontWeight="medium">
            Additional Questions
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            marginTop="0.125rem"
            marginBottom="1rem">
            Anything else you'd like us to cover?
          </Typography>
          <TextField
            variant="outlined"
            rows={5}
            multiline
            placeholder="Paste your application questions here"
            value={applicationQuestion}
            onChange={(e) => setApplicationQuestion(e.target.value)}
          />

          <Divider style={{ marginTop: "1.25rem", marginBottom: "1.25rem" }} />

          <Button
            variant="contained"
            color="primary"
            endIcon={<AutoAwesomeIcon />}
            // uncomment this if you want to see the console log something
            onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}
