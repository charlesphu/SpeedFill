"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
// MUI
import { Box } from "@mui/system";
import { Button, Card, Divider, IconButton, TextField } from "@mui/material";
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
              {...getRootProps()}>
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
              placeholder="Paste the job application URL here"
              style={{ flex: 1, marginRight: "15px" }}
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
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <Divider style={{ marginTop: "28px", marginBottom: "20px" }} />

          <Typography variant="h5" fontWeight="medium">
            Additional Questions
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            marginTop="2px"
            marginBottom="15px">
            Anything else you'd like us to cover? Let us know!
          </Typography>
          <TextField
            variant="outlined"
            rows={5}
            multiline
            placeholder="Paste your application questions here"
            value={applicationQuestion}
            onChange={(e) => setApplicationQuestion(e.target.value)}
          />

          <Divider style={{ marginTop: "23px", marginBottom: "23px" }} />

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
