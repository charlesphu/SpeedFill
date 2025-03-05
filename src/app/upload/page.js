"use client";

import { useState, useEffect } from "react";
import { Box, useTheme, Fade, IconButton } from "@mui/material";
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
import useAIPrompt from "../hooks/useAIPrompt";

const Upload = () => {
  const {
    response,
    error,
    loading,
    cooldownMessage,
    handleGenerateCoverLetter,
    handleAnalyzeResume,
  } = useAIPrompt();

  const theme = useTheme();
  const router = useRouter();

  const { user, logout } = useAuth();

  // Redirect to auth page if user is not logged in
  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user]);

  const [position, setPosition] = useState(0); // 0 = left, 1 = middle, 2 = right

  const [resumeData, setResumeData] = useState({ file: null, text: "" });
  const [jobDescriptionData, setJobDescriptionData] = useState({
    url: "",
    text: "",
  });
  const [additionalDetails, setAdditionalDetails] = useState("");

  const [formsFilled, setFormsFilled] = useState(false);

  useEffect(() => {
    const isFilled = resumeData.file || resumeData.text;
    const isJobDescriptionFilled =
      jobDescriptionData.url || jobDescriptionData.text;
    setFormsFilled(isFilled && isJobDescriptionFilled);
  }, [resumeData, jobDescriptionData]);

  const goToPosition = (index) => {
    if (index >= 0 && index <= 2) {
      setPosition(index);
    }
  };

  const AnalyzeResume = async () => {
    if (formsFilled) {
      console.log("Analyze - Resume Data:", resumeData);
      // console.log("Analyze - Job Description Data:", jobDescriptionData);
      // console.log("Analyze - Additional Details:", additionalDetails);
      await handleAnalyzeResume(
        resumeData,
        jobDescriptionData,
        additionalDetails
      );
      router.push("/result?type=resume");
    }
  };

  const GenerateCL = async () => {
    if (formsFilled) {
      console.log("Cover Letter - Resume Data:", resumeData);
      // console.log("Cover Letter - Job Description Data:", jobDescriptionData);
      // console.log("Cover Letter - Additional Details:", additionalDetails);
      await handleGenerateCoverLetter(
        resumeData,
        jobDescriptionData,
        additionalDetails
      );
      router.push("/result?type=coverletter");
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
                  icon="./icons/File.svg"
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
                  icon="./icons/Search.svg"
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
          </Box>
        </Fade>
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
