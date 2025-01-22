"use client";

import React, { useState } from "react";
import { useDropzone } from 'react-dropzone';

// MUI
import { Box } from "@mui/system";
import { Button, Divider, TextField, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LinkIcon from "@mui/icons-material/Link";
import { FileUpload } from "@mui/icons-material";

// AI prompt
import useAIPrompt from "../hooks/useAIPrompt";

export default function Home() {
  // const { response, error, loading, sendPrompt } = useAIPrompt();

  // return (
  //   <Box>
  //     <Button
  //       variant="contained"
  //       endIcon={<AutoAwesomeIcon />}
  //       onClick={() => sendPrompt("how do i study?")}
  //       loading={loading}
  //       loadingPosition={"end"}>
  //       Ask AI
  //     </Button>

  //     <Typography variant="body1" className="ai-output">
  //       {response}
  //     </Typography>
  //   </Box>
  // );

  const { response, error, loading, sendPrompt } = useAIPrompt();
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobUrl, setJobUrl] = useState("")
  const [applicationQuestion, setApplicationQuestion] = useState("");
  const [urlError, setUrlError] = useState(false);
  const [formError, setFormError] = useState(false);
  const [resumeError, setResumeError] = useState(false);
  const [urlWarning, setUrlWarning] = useState(false);

  /*
    Priority of submit button errors
      1. If no resume is entered, flash a resumeError
      2. If neither a URL or description for a job was given, flash a formError
      3. If the user submitted an invalid URL, flash a urlError
  */

  const handleSubmit = () => {
    if (!resumeText) {
      setResumeError(true);
      return;
    } else {
      setResumeError(false);
    }
    if (!jobUrl && !jobDescription) {
      setFormError(true);
      return;
    }
    if (jobUrl && !validateUrl(jobUrl)) {
      setUrlError(true);
      return;
    }
    setFormError(false);
    const prompt = `Resume: ${resumeText}\nJob Description: ${jobDescription || `URL: ${jobUrl}`}\nApplication Question: ${applicationQuestion}`;
    sendPrompt(prompt);
  };


  const onDrop = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = (e) => setResumeText(e.target.result);
    reader.readAsText(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [], "application/msword": [], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [] },
    maxSize: 5242880,
  });

  /* 
    Clear the "type in" job description and update the URL
  */

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setJobUrl(url);
    setJobDescription("");
    setUrlError(false);
    setFormError(false);
    setUrlWarning(false);
  };

  /* 
    Clear the url job description and update the "type in" description
  */

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
    setJobUrl("");
    setUrlError(false);
    setFormError(false);
    setUrlWarning(false);
  };

  /*
    Ensure url given is a valid link.
  */

  const validateUrl = (url) => {
    const urlPattern = new RegExp(
      "^(https?://)?" +
      "([\\da-z.-]+)\\.([a-z.]{2,6})" +
      "([/\\w .-]*)*/?$"
    );
    return urlPattern.test(url);
  };

  const handleUrlBlur = () => {
    if (jobUrl && !validateUrl(jobUrl)) {
      setUrlWarning(true);
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingTop="20px"
        paddingBottom="40px"
        elevation={0}>
        <Typography variant="h1" fontWeight="bold" marginBottom="10px">
          SpeedFill
        </Typography>
        <Typography variant="h5" marginBottom="10px" color="textSecondary">
          Seamless Job Applications, Every Time.
        </Typography>
        <Typography variant="body1" color="textSecondary" marginTop="2px">
          Upload your resume and let AI help you land your dream job!
        </Typography>

        <Box
          style={{
            boxShadow:
              "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
          }}
          display="flex"
          flexDirection="column"
          padding="20px"
          bgcolor="#212121"
          borderRadius="8px"
          width="80%"
          maxWidth="800px"
          marginTop="20px">
          <Typography variant="h5" fontWeight="medium">
            Your Resume
          </Typography>
          <Typography variant="body1" color="textSecondary" marginTop="2px">
            Share your resume with us and AI will take a look
          </Typography>
          <Box display="flex" flexDirection="row" marginTop="15px">
            <Box
              flex="1"
              marginRight="9px"
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
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <FileUpload style={{ fontSize: "48px", marginBottom: "10px" }} />
              <Typography variant="body1" marginBottom="5px">
                Drag and drop or <strong>Click to upload</strong>
              </Typography>
              <Typography variant="body2" color="textTertiary">
                PDF, DOC or DOCX (MAX. 5MB)
              </Typography>
            </Box>
            <Box
              flex="1"
              marginLeft="9px"
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
          {resumeError && (
            <Typography
              variant="body2"
              color="error"
              style={{ marginTop: "8px" }}>
              Please upload or paste your resume.
            </Typography>
          )}

          <Divider style={{ marginTop: "28px", marginBottom: "20px" }} />

          <Typography variant="h5" fontWeight="medium">
            Job Description
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            marginTop="2px"
            marginBottom="15px">
            Tell us a little about the job you're applying for
          </Typography>
          <Box display="flex" flexDirection="row" marginBottom="10px">
            <TextField
              variant="outlined"
              type="url"
              placeholder="Paste the job application URL here"
              style={{ flex: 1, marginRight: "15px" }}
              value={jobUrl}
              onChange={handleUrlChange}
              onBlur={handleUrlBlur}
              error={urlError}
              helperText={urlError ? "Invalid URL format!" : urlWarning ? "Warning, this doesn't seem to be a valid URL. Please double check before submitting." : ""}
            />
            <Button
              color="link"
              variant="outlined"
              style={{ minWidth: "48px" }}>
              <LinkIcon fontSize="medium" />
            </Button>
          </Box>
          <Divider
            style={{
              width: "50%",
              margin: "2px auto 8px auto",
            }}>
            <span style={{ color: "#999" }}>OR</span>
          </Divider>
          <TextField
            variant="outlined"
            rows={5}
            multiline
            placeholder="Paste the job description here"
            value={jobDescription}
            onChange={handleJobDescriptionChange}
          />
          {formError && (
            <Typography
              variant="body2"
              color="error"
              style={{ marginTop: "8px" }}>
              Please provide either a job URL or a job description.
            </Typography>
          )}
          <Typography variant="h5" fontWeight="medium" marginTop="20px">
            Application Questions
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            marginTop="2px"
            marginBottom="2px">
            Is there any question that hard for you to answer? We can help you with that
          </Typography>
          <Divider style={{ marginTop: "23px", marginBottom: "23px" }} />
          <TextField
            variant="outlined"
            rows={5}
            multiline
            placeholder="Paste your application's question here"
            value={applicationQuestion}
            onChange={(e) => setApplicationQuestion(e.target.value)}
          />
          <Divider style={{ marginTop: "28px", marginBottom: "20px" }} />
          <Button
            variant="contained"
            color="primary"
            endIcon={<AutoAwesomeIcon />}
            // uncomment this if you want to see the console log something
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
        {response && <Typography variant="body1" marginTop={2}>{response}</Typography>}
      </Box>
    </>
  );
}
