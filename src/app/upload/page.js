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

import { auth } from "../firebase";

const Upload = () => {
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const [position, setPosition] = useState(0); // 0 = left, 1 = middle, 2 = right

  const [resumeData, setResumeData] = useState({ file: null, text: "" });
  const [jobDescriptionData, setJobDescriptionData] = useState({
    url: "",
    text: "",
  });
  const [additionalDetails, setAdditionalDetails] = useState("");

  const [formsFilled, setFormsFilled] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

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

  const AnalyzeResume = () => {
    if (formsFilled) {
      console.log("Analyze - Resume Data:", resumeData);
      console.log("Analyze - Job Description Data:", jobDescriptionData);
      console.log("Analyze - Additional Details:", additionalDetails);
    }
  };

  const GenerateCL = () => {
    if (formsFilled) {
      console.log("Cover Letter - Resume Data:", resumeData);
      console.log("Cover Letter - Job Description Data:", jobDescriptionData);
      console.log("Cover Letter - Additional Details:", additionalDetails);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100%",
        }}>
        <Box
          sx={{
            marginTop: "7rem",
            display: "flex",
            height: "10vh",
            minheight: "200px",
            width: "100%",
            alignItems: "end",
            justifyContent: "center",
          }}>
          <Box
            sx={{
              display: "flex",
              width: "30%",
              justifyContent: "center",
            }}>
            <Title variant="medium" />
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: "2rem",
            display: "flex",
            height: "55vh",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            flexShrink: "0",
          }}>
          <Box
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
              transition: "transform 1s ease-in-out, scale 0.5s ease",
              pointerEvents: position === 0 ? "auto" : "none",
              opacity: position === 0 ? 1 : 0.5,
            }}>
            <ResumeUpload
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          </Box>

          <Box
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
                "transform 1s ease-in-out, width 0.5s ease, scale 0.5s ease",
              pointerEvents: position === 1 ? "auto" : "none",
              opacity: position === 1 ? 1 : 0.5,
            }}>
            <JobDescriptionUpload
              jobDescriptionData={jobDescriptionData}
              setJobDescriptionData={setJobDescriptionData}
            />
          </Box>

          <Box
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
              transition: "transform 1s ease-in-out, scale 0.5s ease",
              pointerEvents: position === 2 ? "auto" : "none",
              opacity: position === 2 ? 1 : 0.5,
            }}>
            <AdditionalDetails
              additionalDetails={additionalDetails}
              setAdditionalDetails={setAdditionalDetails}
            />
          </Box>
        </Box>
        <Box
          sx={{
            position: "relative",
            marginTop: "0.5rem",
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
        <Fade in={formsFilled} timeout={700}>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                alignItems: "center",
                marginTop: "1rem",
              }}>
              <CustomButton
                sx={{
                  width: "15rem",
                  backgroundColor: theme.palette.menu.submit_button,
                  boxShadow: `0 0 5px ${theme.palette.menu.submit_button}`,
                  borderRadius: "15px",
                  "&:hover": {
                    backgroundColor: theme.palette.menu.submit_button_hover,
                    boxShadow: `0 0 10px ${theme.palette.menu.submit_button}`,
                  },
                }}
                onClick={AnalyzeResume}>
                Analyze Resume
                <img
                  src="icons/scribbles/right.svg"
                  alt="scribbles"
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "110%",
                    marginLeft: "5px",
                  }}
                />
              </CustomButton>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <CustomButton
                  sx={{
                    width: "15rem",
                    backgroundColor: theme.palette.menu.submit_button,
                    boxShadow: `0 0 5px ${theme.palette.menu.submit_button}`,
                    borderRadius: "15px",
                    "&:hover": {
                      backgroundColor: theme.palette.menu.submit_button_hover,
                      boxShadow: `0 0 10px ${theme.palette.menu.submit_button}`,
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
      <NavBar>
        <NavBarItem text="Home" src="/" />
        <NavBarItem text="Upload" src="/upload" />
        <NavBarItem text="Dashboard" src="/dashboard" />
        {user ? (
          <NavBarItem text={user.email} src="#" />
        ) : (
          <NavBarItem text="Sign Up/Login" src="/auth" />
        )}
      </NavBar>
      <Background />
      <Background />
    </>
  );
};

export default Upload;
