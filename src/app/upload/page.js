"use client";

import { useState, useEffect } from "react";
import { Box, Button, useTheme, Fade, Typography } from "@mui/material";
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

  const [position, setPosition] = useState(0); // 0 = left, 1 = middle, 2 = right

  const [resumeData, setResumeData] = useState({ file: null, text: "" });
  const [jobDescriptionData, setJobDescriptionData] = useState({
    url: "",
    text: "",
  });
  const [additionalDetails, setAdditionalDetails] = useState("");

  const [formsFilled, setFormsFilled] = useState(false);

  const { response, error, loading, cooldownMessage, handleGenerateCoverLetter, handleAnalyzeResume } = useAIPrompt();

  useEffect(() => {
    const isFilled = resumeData.file || resumeData.text;
    const isJobDescriptionFilled =
      jobDescriptionData.url || jobDescriptionData.text;
    const isAdditionalDetailsFilled = additionalDetails.trim() !== "";
    setFormsFilled(isFilled && isJobDescriptionFilled && isAdditionalDetailsFilled);
  }, [resumeData, jobDescriptionData, additionalDetails]);

  const goToPosition = (index) => {
    if (index >= 0 && index <= 2) {
      setPosition(index);
    }
  };

  const AnalyzeResume = () => {
    if (formsFilled) {
      handleAnalyzeResume(resumeData.text, jobDescriptionData.text || jobDescriptionData.url);
    }
  };

  const GenerateCL = () => {
    if (formsFilled) {
      handleGenerateCoverLetter(resumeData.text, jobDescriptionData.text || jobDescriptionData.url, additionalDetails)
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "100%",
        }}>
        {/* Title */}
        <Title sx={{ paddingTop: "2rem" }} />

        {/* Forms */}
        <Box
          sx={{
            marginTop: "5rem",
            display: "flex",
            width: "100%",
            height: "30rem",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            flexShrink: "0",
          }}>
          <Box
            onClick={() => goToPosition(0)}
            sx={{
              position: "absolute",
              display: "flex",
              width: "50%",
              justifyContent: "center",
              transform:
                position === 0
                  ? "translateX(0)"
                  : position === 1
                  ? "translateX(-40rem) scale(0.6)"
                  : "translateX(-80rem) scale(0.6)",
              transition:
                "transform 0.7s ease-in-out, scale 0.2s ease, opacity 0.2s ease",
              opacity: position === 0 ? 1 : 0.5,
            }}>
            <ResumeUpload
              resumeData={resumeData}
              setResumeData={setResumeData}
              sx={{
                pointerEvents: position === 0 ? "auto" : "none",
              }}
            />
          </Box>

          <Box
            onClick={() => goToPosition(1)}
            sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              width: "50%",
              transform:
                position === 0
                  ? "translateX(40rem) scale(0.6)"
                  : position === 1
                  ? "translateX(0) scale(1)"
                  : "translateX(-40rem) scale(0.6)",
              transition:
                "transform 0.7s ease-in-out, scale 0.2s ease, opacity 0.2s ease",
              opacity: position === 1 ? 1 : 0.5,
            }}>
            <JobDescriptionUpload
              jobDescriptionData={jobDescriptionData}
              setJobDescriptionData={setJobDescriptionData}
              sx={{
                pointerEvents: position === 1 ? "auto" : "none",
              }}
            />
          </Box>

          <Box
            onClick={() => goToPosition(2)}
            sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              width: "50%",
              transform:
                position === 0
                  ? "translateX(80rem) scale(0.6)"
                  : position === 1
                  ? "translateX(40rem) scale(0.6)"
                  : "translateX(0) scale(1)",
              transition:
                "transform 0.7s ease-in-out, scale 0.2s ease, opacity 0.2s ease",
              opacity: position === 2 ? 1 : 0.5,
            }}>
            <AdditionalDetails
              additionalDetails={additionalDetails}
              setAdditionalDetails={setAdditionalDetails}
              sx={{
                pointerEvents: position === 2 ? "auto" : "none",
              }}
            />
          </Box>
        </Box>

        {/* Pagination Controls */}
        <Box
          sx={{
            position: "relative",
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}>
          <IconButton
            onClick={() => goToPosition(position - 1)}
            disabled={position === 0}
            sx={{ color: "white" }}>
            <ArrowBackIosIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "10rem",
              height: "16px",
              borderRadius: "25px",
              backgroundColor: "rgba(45, 45, 45, 0.5)",
              padding: "0.3rem",
              gap: "5px",
            }}>
// <<<<<<< chan
//             <CustomButton
//               sx={{
//                 width: "15rem",
//                 backgroundColor: theme.palette.menu.submit_button,
//                 boxShadow: `0 0 5px ${theme.palette.menu.submit_button}`,
//                 "&:hover": {
//                   backgroundColor: theme.palette.menu.submit_button_hover,
//                   boxShadow: `0 0 10px ${theme.palette.menu.submit_button}`,
//                 },
//               }}
//               onClick={AnalyzeResume}
//                 disabled={loading}>
//               Analyze Resume
//             </CustomButton>
//             <CustomButton
//               sx={{
//                 width: "15rem",
//                 backgroundColor: theme.palette.menu.submit_button,
//                 boxShadow: `0 0 5px ${theme.palette.menu.submit_button}`,
//                 "&:hover": {
//                   backgroundColor: theme.palette.menu.submit_button_hover,
//                   boxShadow: `0 0 10px ${theme.palette.menu.submit_button}`,
//                 },
//               }}
//               onClick={GenerateCL}
//                 disabled={loading}>
//               Generate Cover Letter
//             </CustomButton>
// =======
            {[0, 1, 2].map((index) => (
              <Box
                key={index}
                onClick={() => goToPosition(index)}
                sx={{
                  width: "33%",
                  height: "5px",
                  borderRadius: "10px",
                  backgroundColor:
                    position === index ? "white" : "rgba(149, 145, 145, 0.84)",
                  boxShadow: position === index ? `0 0 5px white` : "none",
                  transition: "background-color 0.5s ease",
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>
          <IconButton
            onClick={() => goToPosition(position + 1)}
            disabled={position === 2}
            sx={{ color: "white" }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        {/* Control Buttons */}
        <Fade in={formsFilled} timeout={700}>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                alignItems: "center",
                marginTop: "1rem",
                marginBottom: "3rem",
                position: "relative",
              }}>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <CustomButton
                  icon="./Icons/File.svg"
                  sx={{
                    width: "15rem",
                    backgroundColor: theme.palette.menu.submit_button,
                    boxShadow: `0 0 10px ${theme.palette.menu.submit_button}`,
                    borderRadius: "15px",

                    transition: "transform 0.1s",
                    "&:hover": {
                      transform: "scale(1.1)",
                      backgroundColor: theme.palette.menu.submit.hover,
                      boxShadow: `0 0 15px ${theme.palette.menu.submit.hover}`,
                    },
                    "&:active": {
                      transform: "scale(0.95)",
                    },
                  }}
                  onClick={AnalyzeResume}>
                  Analyze Resume
                </CustomButton>
                <img
                  src="icons/scribbles/right.svg"
                  alt="scribbles"
                  style={{
                    position: "absolute",
                    right: "110%",
                    marginRight: "5px",
                  }}
                />
              </Box>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <CustomButton
                  icon="./Icons/Search.svg"
                  sx={{
                    width: "18rem",
                    backgroundColor: theme.palette.menu.submit_button,
                    boxShadow: `0 0 10px ${theme.palette.menu.submit_button}`,
                    borderRadius: "15px",

                    transition: "transform 0.1s",
                    "&:hover": {
                      transform: "scale(1.1)",
                      backgroundColor: theme.palette.menu.submit.hover,
                      boxShadow: `0 0 15px ${theme.palette.menu.submit.hover}`,
                    },
                    "&:active": {
                      transform: "scale(0.95)",
                    },
                  }}
                  onClick={GenerateCL}>
                  Generate Cover Letter
                </CustomButton>
                <img
                  src="icons/scribbles/left.svg"
                  alt="scribbles"
                  style={{
                    position: "absolute",
                    top: "-20px",
                    left: "110%",
                    marginLeft: "5px",
                  }}
                />
              </Box>
            </Box>
// >>>>>>> main
          </Box>
        </Fade>

        {cooldownMessage && cooldownMessage !== "" && (
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
          // <NavBarItem text={user.email} src="#" />
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
