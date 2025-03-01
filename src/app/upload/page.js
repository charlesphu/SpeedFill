"use client";

import { useState, useEffect } from "react";
import { Box, Button, useTheme, Fade, Typography, IconButton } from "@mui/material";
import useAIPrompt from "../hooks/useAIPrompt";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Background from "../components/Background";
import Title from "../components/Title";
import CustomButton from "../components/Button";
import { NavBar, NavBarItem } from "../components/NavBar";
import ResumeUpload from "./ResumeUpload";
import JobDescriptionUpload from "./JobDescriptionUpload";
import AdditionalDetails from "./AdditionalDetails";

import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";

const Upload = () => {
  const theme = useTheme();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [position, setPosition] = useState(0);
  const [resumeData, setResumeData] = useState({ file: null, text: "" });
  const [jobDescriptionData, setJobDescriptionData] = useState({ url: "", text: "" });
  const [additionalDetails, setAdditionalDetails] = useState("");

  const [formsFilled, setFormsFilled] = useState(false);

  const { response, error, loading, cooldownMessage, handleGenerateCoverLetter, handleAnalyzeResume } = useAIPrompt();

  useEffect(() => {
    const isFilled = resumeData.file || resumeData.text;
    const isJobDescriptionFilled = jobDescriptionData.url || jobDescriptionData.text;
    const isAdditionalDetailsFilled = additionalDetails.trim() !== "";

    setFormsFilled(isFilled && isJobDescriptionFilled && isAdditionalDetailsFilled);
  }, [resumeData, jobDescriptionData, additionalDetails]);

  const goToPosition = (index) => {
    if (index >= 0 && index <= 2) {
      setPosition(index);
    }
  };

  const AnalyzeResume = () => {
    if (!formsFilled || loading) return; // Prevent API spam
    handleAnalyzeResume(resumeData.text, jobDescriptionData.text || jobDescriptionData.url);
  };

  const GenerateCL = () => {
    if (!formsFilled || loading) return; // Prevent API spam
    handleGenerateCoverLetter(resumeData.text, jobDescriptionData.text || jobDescriptionData.url, additionalDetails);
  };

  return (
    <>
      <Box sx={{ height: "100%", width: "100%" }}>
        {/* Title */}
        <Title sx={{ paddingTop: "2rem" }} />

        {/* Forms */}
        <Box sx={{
            marginTop: "5rem",
            display: "flex",
            width: "100%",
            height: "30rem",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            flexShrink: "0",
          }}
        >
          {/* Resume Upload Section */}
          <Box onClick={() => goToPosition(0)} sx={{
              position: "absolute",
              display: "flex",
              width: "50%",
              justifyContent: "center",
              transform: position === 0 ? "translateX(0)" :
                        position === 1 ? "translateX(-40rem) scale(0.6)" :
                        "translateX(-80rem) scale(0.6)",
              transition: "transform 0.7s ease-in-out, scale 0.2s ease, opacity 0.2s ease",
              opacity: position === 0 ? 1 : 0.5,
            }}
          >
            <ResumeUpload resumeData={resumeData} setResumeData={setResumeData} sx={{
                pointerEvents: position === 0 ? "auto" : "none",
              }}
            />
          </Box>

          {/* Job Description Upload Section */}
          <Box onClick={() => goToPosition(1)} sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              width: "50%",
              transform: position === 0 ? "translateX(40rem) scale(0.6)" :
                        position === 1 ? "translateX(0) scale(1)" :
                        "translateX(-40rem) scale(0.6)",
              transition: "transform 0.7s ease-in-out, scale 0.2s ease, opacity 0.2s ease",
              opacity: position === 1 ? 1 : 0.5,
            }}
          >
            <JobDescriptionUpload jobDescriptionData={jobDescriptionData} setJobDescriptionData={setJobDescriptionData} sx={{
                pointerEvents: position === 1 ? "auto" : "none",
              }}
            />
          </Box>

          {/* Additional Details Section */}
          <Box onClick={() => goToPosition(2)} sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              width: "50%",
              transform: position === 0 ? "translateX(80rem) scale(0.6)" :
                        position === 1 ? "translateX(40rem) scale(0.6)" :
                        "translateX(0) scale(1)",
              transition: "transform 0.7s ease-in-out, scale 0.2s ease, opacity 0.2s ease",
              opacity: position === 2 ? 1 : 0.5,
            }}
          >
            <AdditionalDetails additionalDetails={additionalDetails} setAdditionalDetails={setAdditionalDetails} sx={{
                pointerEvents: position === 2 ? "auto" : "none",
              }}
            />
          </Box>
        </Box>

        {/* Pagination Controls */}
        <Box sx={{ position: "relative", marginTop: "2rem", display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
          <IconButton onClick={() => goToPosition(position - 1)} disabled={position === 0} sx={{ color: "white" }}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={() => goToPosition(position + 1)} disabled={position === 2} sx={{ color: "white" }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        {/* Control Buttons */}
        <Fade in={formsFilled} timeout={700}>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "2rem", alignItems: "center", marginTop: "1rem", marginBottom: "3rem" }}>
            <CustomButton onClick={AnalyzeResume} disabled={loading}>
              Analyze Resume
            </CustomButton>
            <CustomButton onClick={GenerateCL} disabled={loading}>
              Generate Cover Letter
            </CustomButton>
          </Box>
        </Fade>

        {cooldownMessage && (
          <Typography color="error" style={{ textAlign: "center", marginTop: "10px" }}>
            {cooldownMessage}
          </Typography>
        )}

        {loading && <Typography style={{ textAlign: "center", marginTop: "10px" }}>Loading AI Response...</Typography>}

        {response && (
          <pre style={{ backgroundColor: "#f4f4f4", padding: "10px", marginTop: "10px" }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        )}

        {error && (
          <Typography color="error" style={{ textAlign: "center", marginTop: "10px" }}>
            Error: {error}
          </Typography>
        )}
      </Box>

      {/* Navigation Bar */}
      <NavBar>
        <NavBarItem text="Home" src="/" />
        {user ? (
          <>
            <NavBarItem text="Dashboard" src="/dashboard" />
            <NavBarItem text="Sign Out" src="/" onClick={logout} />
          </>
        ) : (
          <NavBarItem text="Sign In" src="/auth" />
        )}
      </NavBar>
      <Background />
    </>
  );
};

export default Upload;
