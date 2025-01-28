"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

// MUI
import { Box } from "@mui/system";
import {
  Button,
  Divider,
  TextField,
  LinearProgress,
  FormControlLabel,
  Switch,
  Fade,
} from "@mui/material";

import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LinkIcon from "@mui/icons-material/Link";
import { FileUpload, InsertDriveFile, Opacity } from "@mui/icons-material";

// AI prompting
import useAIPrompt from "../hooks/useAIPrompt";

export default function Home() {
  /*
    STATE VARIABLES
  */

  const { response, error, loading, sendPrompt } = useAIPrompt();

  // Text fields
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [applicationQuestion, setApplicationQuestion] = useState("");

  // Control flow
  const [acceptResumeAsText, setResumeAcceptanceType] = useState(false);

  const [hasResume, setHasResume] = useState(false);
  const [hasJobDetail, setHasJobDetail] = useState(false);

  // Error / Warning Handling
  const [showJobUrlError, updateJobUrlError] = useState(false);
  const [showJobDetailError, updateJobDetailError] = useState(false);
  const [showResumeError, updateResumeError] = useState(false);

  const [fileError, setFileError] = useState(false);
  const [fileErrorMessage, setFileErrorMessage] = useState("");

  // File handling
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const [isFileUploading, setIsFileUploading] = useState(false);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);

  // Show response component
  const [showResponse, setShowResponse] = useState(false);

  const handleResumeTextChange = (event) => {
    setResumeAcceptanceType(event.target.checked);
  };

  // Style variable for hovering over text
  const textHoverStyle = {
    transition: "transform 0.5s ease",
    willChange: "transform",
    "&:hover": {
      transform: "scale(1.03)",
    },
  };

  /*
    FUNCTIONS
  */

  /**
   * Simulates the file upload process by setting the uploading state,
   * updating the file name, and incrementally increasing upload progress.
   *
   * NOTE - placeholder for actual backend upload progress.
   *
   * @param {File} file The resume file to be uploaded. Expected to be file object.
   * @returns {void} Does not return anything.
   */
  const uploadResume = (file) => {
    let progress = 0;

    setIsFileUploading(true);
    setFileName(file.name);
    setFile(file);

    // FAKE LOADING, REPLACE WITH ACTUAL BACKEND LOADING PROGRESS LATER!
    // come back and replace with circular/linear indeterminate once backend is set up to handle (see https://mui.com/material-ui/react-progress/)
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 10;
        setFileUploadProgress(progress);
      } else {
        clearInterval(interval);
        setIsFileUploading(false);
        setHasResume(true);
      }
    }, 500);
  };

  /**
   * Clears the current resume file information, & resets the uploading progress.
   *
   * @returns {void} Does not return anything.
   */
  const handleClearResume = () => {
    setFileName("");
    setFileUploadProgress(0);

    setIsFileUploading(false);
    setHasResume(false);
  };

  /**
   * Handles form submission by validating the resume, job description, and URL.
   * Ensures information passes basic validity checks
   *
   * The error priorities are:
   * 1. If no resume is entered, a resumeError is given.
   * 2. If neither a job URL nor description is provided, a formError is given.
   * 3. If an invalid URL is provided, a urlError is given.
   *
   * @returns {void} Does not return anything.
   */
  const handleSubmit = () => {
    // const resumeText = "This is a test resume text";
    // const jobDescription = "This is a test job description";

    // We want to display all missing fields at once
    if (!hasResume) {
      updateResumeError(true);
    }

    if (!hasJobDetail) {
      updateJobDetailError(true);
    }

    // Only proceed if all fields are filled
    if (hasResume && hasJobDetail) {
      setShowResponse(true);
      // const prompt = `Resume: ${resumeText}\nJob Description: ${
      //   jobDescription || `URL: ${jobUrl}`
      // }\nApplication Question: ${applicationQuestion}`;
      // sendPrompt(prompt);
    }
  };

  /**
   * Handles the file drop event when a user drops a file into the upload area.
   * If there is already a file uploaded (i.e., `fileName` is not empty),
   * it clears the previous file and resets the upload state before uploading the new file.
   *
   * @param {Array<File>} acceptedFiles An array of files that the user has dropped.
   * Hopefully this is only one file, as the other functionality here relies on there only being on file in this array.
   * @returns {void} Does not return anything.
   */
  const onDrop = (acceptedFiles, rejectedFiles) => {
    const file = acceptedFiles[0];

    // Check if there are any rejected files
    if (rejectedFiles.length > 0) {
      setFileError(true);
      setFileErrorMessage("Unsupported file type.");
      return;
    }

    setFileError(false);
    setFileErrorMessage("");

    if (fileName) {
      handleClearResume(file);
    }

    uploadResume(file);
  };

  /**
   * Initializes the file drop zone using the `useDropzone` hook.
   * NOTE - The drop zone is disabled while the upload is in progress.
   *
   * @returns {Object} The `getRootProps`, `getInputProps` methods
   */
  const { getRootProps, getInputProps } = useDropzone({
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

  /**
   * Handles changes to the job URL input field.
   * Updates the job URL state and resets related states.
   *
   * @param {React.ChangeEvent} e The event object from the input field (new URL value).
   * @returns {void} Does not return anything.
   */
  const handleUrlChange = (e) => {
    const url = e.target.value;

    setJobUrl(url);
    setJobDescription("");

    updateJobUrlError(false);
    updateJobDetailError(false);

    setHasJobDetail(false);
  };

  /**
   * Handles changes to the job description text input field.
   * Updates the job text state and resets related states.
   *
   * @param {React.ChangeEvent} e The event object from the input field (new job description).
   * @returns {void} Does not return anything.
   */
  const handleJobDescriptionChange = (e) => {
    updateJobUrlError(false);
    updateJobDetailError(false);

    setJobUrl("");
    setJobDescription(e.target.value);

    setHasJobDetail(e.target.value.length > 0);
  };

  /**
   * Validates whether the given URL is in a valid format.
   *
   * @param {string} url The URL to be validated.
   * @returns {boolean} Returns `true` if the URL matches the valid pattern, otherwise returns `false`.
   */
  const validateUrl = (url) => {
    const urlPattern = new RegExp(
      "^(https?://)?" + "([\\da-z.-]+)\\.([a-z.]{2,6})" + "([/\\w .-]*)*/?$"
    );
    return urlPattern.test(url);
  };

  /**
   * Handles the blur event for the job URL input field.
   * If the URL is invalid, sets the URL error state to `true`.
   *
   * @returns {void} Does not return anything.
   */
  const handleUrlBlur = () => {
    if (jobUrl && validateUrl(jobUrl)) {
      setHasJobDetail(true);
    } else if (jobUrl) {
      updateJobUrlError(true);
      setHasJobDetail(false);
    }
  };

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
          Speed
          <span
            style={{
              background:
                "linear-gradient(45deg,rgb(171, 117, 188) 30%,rgb(255, 255, 255)) 30%",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}>
            Fill
          </span>
        </Typography>
        <Typography
          sx={textHoverStyle}
          variant="h5"
          marginBottom="0.625rem"
          color="textSecondary"
          style={{ textShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)" }}>
          Seamless Job Applications, Every Time.
        </Typography>
        <Typography
          sx={textHoverStyle}
          variant="body1"
          color="textSecondary"
          marginTop="0.125rem"
          marginBottom="0.9rem"
          style={{ textShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)" }}>
          Upload your resume and let AI help you land your dream job!
        </Typography>

        <Box
          style={{
            boxShadow:
              "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
          }}
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          padding="1.25rem"
          bgcolor="#212121"
          borderRadius="0.5rem"
          width="80%"
          maxWidth="50rem">
          {showResponse ? (
            <TextField
              value="This is an example response"
              InputProps={{ readOnly: true }}
            />
          ) : (
            <>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%">
                <Typography
                  sx={textHoverStyle}
                  variant="h5"
                  fontWeight="medium">
                  Your Resume
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={acceptResumeAsText}
                      onChange={handleResumeTextChange}
                    />
                  }
                  label="Type in Resume"
                  sx={{
                    ".MuiTypography-root": {
                      fontSize: "0.8rem",
                      color: "text.primary",
                    },
                  }}
                />
              </Box>
              <Typography
                variant="body1"
                color="textSecondary"
                marginTop="0.125rem"
                marginBottom="0.9rem">
                Share your resume with us and AI will take a look
              </Typography>
              <Box
                flex="1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                bgcolor="#282828"
                color="#999"
                borderRadius="8px"
                textAlign="center"
                style={{
                  cursor: "pointer",
                  height: "100%",
                  width: "100%",
                  transition: "border 0.3s ease",
                  border: acceptResumeAsText ? "none" : "2px dashed #999",
                }}
                minHeight="220px">
                {!acceptResumeAsText ? (
                  <Fade in={!acceptResumeAsText}>
                    <Box
                      {...getRootProps()}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      style={{
                        width: "100%",
                        height: "100%",
                        padding: "1rem",
                      }}>
                      <input {...getInputProps()} disabled={fileName} />
                      {isFileUploading ? (
                        <>
                          <LinearProgress
                            variant="determinate"
                            value={fileUploadProgress}
                            sx={{ width: "50%", marginTop: "10px" }}
                          />
                          <Typography variant="body1" marginTop="10px">
                            Uploading...
                          </Typography>
                        </>
                      ) : fileName ? (
                        <>
                          <InsertDriveFile
                            fontSize="large"
                            style={{ marginBottom: "10px" }}
                          />
                          <Typography variant="body1">{fileName}</Typography>
                          <Button
                            variant="text"
                            color="secondary"
                            onClick={handleClearResume}
                            style={{
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
                              window.open(URL.createObjectURL(file), "_blank")
                            }
                            style={{ padding: "1px 7px" }}
                            disabled={isFileUploading}>
                            Preview Document
                          </Button>
                        </>
                      ) : (
                        <>
                          <FileUpload
                            style={{ fontSize: "48px", marginBottom: "10px" }}
                          />
                          <Typography variant="body1" marginBottom="5px">
                            Drag and drop or <strong>Click to upload</strong>
                          </Typography>
                          <Typography variant="body2" color="textTertiary">
                            PDF, DOC, or DOCX (MAX. 5MB)
                          </Typography>
                        </>
                      )}
                      {fileError && (
                        <Typography
                          variant="body2"
                          color="error"
                          style={{ marginTop: "8px" }}>
                          {fileErrorMessage}
                        </Typography>
                      )}
                    </Box>
                  </Fade>
                ) : (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ width: "100%", height: "100%" }}>
                    <TextField
                      multiline
                      rows={8}
                      variant="outlined"
                      placeholder="Type your resume content here..."
                      value={resumeText}
                      onChange={(e) => {
                        setResumeText(e.target.value);
                        updateResumeError(false);

                        setHasResume(e.target.value.length > 0);
                      }}
                      style={{
                        minHeight: "200px",
                        height: "100%",
                        width: "100%",
                        color: "#fff",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    />
                  </Box>
                )}
              </Box>
              {showResumeError && (
                <Typography
                  variant="body2"
                  color="error"
                  style={{ marginTop: "8px" }}>
                  Please upload or paste your resume.
                </Typography>
              )}

              <Divider
                style={{ marginTop: "1.25rem", marginBottom: "0.9rem" }}
              />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%">
                <Typography
                  sx={textHoverStyle}
                  variant="h5"
                  fontWeight="medium">
                  Job Description
                </Typography>
              </Box>
              <Typography
                variant="body1"
                color="textSecondary"
                marginTop="0.125rem"
                marginBottom="0.9rem">
                Tell us a little about the job you're applying for
              </Typography>
              <Box display="flex" flexDirection="row">
                <TextField
                  variant="outlined"
                  type="url"
                  placeholder="Paste the job application URL here..."
                  style={{ flex: 1, marginRight: "0.8rem" }}
                  value={jobUrl}
                  onChange={handleUrlChange}
                  onBlur={handleUrlBlur}
                  error={showJobUrlError}
                />
                <Button
                  color="link"
                  variant="outlined"
                  style={{
                    minWidth: "3.5rem",
                    height: "3.5rem",
                  }}>
                  <LinkIcon fontSize="medium" />
                </Button>
              </Box>
              {showJobUrlError && (
                <Typography
                  variant="body2"
                  color="error"
                  style={{ marginTop: "8px" }}>
                  This seems to be an invalid URL. Please double-check the link.
                </Typography>
              )}
              <Divider
                style={{
                  width: "50%",
                  margin: "0.6rem auto 0.6rem auto",
                }}>
                <span style={{ color: "#999" }}>OR</span>
              </Divider>
              <TextField
                variant="outlined"
                rows={5}
                multiline
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={handleJobDescriptionChange}
              />
              {showJobDetailError && (
                <Typography
                  variant="body2"
                  color="error"
                  style={{ marginTop: "8px" }}>
                  Please provide a job application URL or a job description.
                </Typography>
              )}

              <Divider
                style={{ marginTop: "1.25rem", marginBottom: "0.9rem" }}
              />

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%">
                <Typography
                  sx={textHoverStyle}
                  variant="h5"
                  fontWeight="medium">
                  Additional Questions
                </Typography>
              </Box>
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
                placeholder="Paste your application questions here..."
                value={applicationQuestion}
                onChange={(e) => setApplicationQuestion(e.target.value)}
              />

              <Divider
                style={{ marginTop: "1.25rem", marginBottom: "1.25rem" }}
              />

              <Button
                variant="contained"
                color="primary"
                endIcon={<AutoAwesomeIcon />}
                // uncomment this if you want to see the console log something
                onClick={handleSubmit}>
                Submit
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
