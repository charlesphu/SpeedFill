"use client";

import { useState, useEffect } from "react";
import { Box, Button, useTheme, Fade } from "@mui/material";

import Background from "../components/Background";
import Title from "../components/Title";
import CustomButton from "../components/Button";
import ResumeUpload from "./ResumeUpload";
import JobDescriptionUpload from "./JobDescriptionUpload";
import AdditionalDetails from "./AdditionalDetails";

import { auth } from "../firebase";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const Upload = () => {
    const theme = useTheme();
    const [user, setUser] = useState(null);
    const [position, setPosition] = useState(0); // 0 = left, 1 = middle, 2 = right

    const [resumeData, setResumeData] = useState({ file: null, text: "" });
    const [jobDescriptionData, setJobDescriptionData] = useState({ url: "", text: "" });
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
        const isJobDescriptionFilled = jobDescriptionData.url || jobDescriptionData.text;
        setFormsFilled(isFilled && isJobDescriptionFilled);
    }, [resumeData, jobDescriptionData]);

    const moveLeft = () => {
        if (position > 0) {
            setPosition(position - 1);
        }
    };

    const moveRight = () => {
        if (position < 2) {
            setPosition(position + 1);
        }
    };

    const AnalyzeResume = () => {
        if (formsFilled){
            console.log("Analyze - Resume Data:", resumeData);
            console.log("Analyze - Job Description Data:", jobDescriptionData);
            console.log("Analyze - Additional Details:", additionalDetails);
        }
    };

    const GenerateCL = () => {
        if (formsFilled){
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
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        height: "25vh",
                        minheight: "200px",
                        width: "100%",
                        alignItems: "end",
                        justifyContent: "center",
                        marginTop: "3rem"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            width: "30%",
                            justifyContent: "center",
                        }}
                    >
                        <Title variant="medium" />
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        height: "65vh",
                        minHeight: "200px",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        overflow: "hidden",
                        flexShrink: "0",
                        zIndex: 50,
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            display: "flex",
                            height: "50vh",
                            width: "50%",
                            justifyContent: "center",
                            transform:
                                position === 0
                                    ? "translateX(0)"
                                    : position === 1
                                        ? "translateX(-80%) scale(0.6)"
                                        : "translateX(-160%) scale(0.6)",
                            transition: "transform 1s ease-in-out, scale 0.5s ease",
                            pointerEvents: position === 0 ? "auto" : "none",
                            opacity: position === 0 ? 1 : 0.5,
                        }}
                    >
                        <ResumeUpload
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                        />
                    </Box>

                    <Box
                        sx={{
                            position: "absolute",
                            display: "flex",
                            height: "50vh",
                            minHeight: "400px",
                            justifyContent: "center",
                            width: "50%",
                            transform:
                                position === 0
                                    ? "translateX(80%) scale(0.6)"
                                    : position === 1
                                        ? "translateX(0) scale(1)"
                                        : "translateX(-80%) scale(0.6)",
                            transition: "transform 1s ease-in-out, width 0.5s ease, scale 0.5s ease",
                            pointerEvents: position === 1 ? "auto" : "none",
                            opacity: position === 1 ? 1 : 0.5,
                        }}
                    >
                        <JobDescriptionUpload
                            jobDescriptionData={jobDescriptionData}
                            setJobDescriptionData={setJobDescriptionData}
                        />
                    </Box>

                    <Box
                        sx={{
                            position: "absolute",
                            display: "flex",
                            height: "50vh",
                            minHeight: "400px",
                            justifyContent: "center",
                            width: "50%",
                            transform:
                                position === 0
                                    ? "translateX(160%) scale(0.6)"
                                    : position === 1
                                        ? "translateX(80%) scale(0.6)"
                                        : "translateX(0) scale(1)",
                            transition: "transform 1s ease-in-out, scale 0.5s ease",
                            pointerEvents: position === 2 ? "auto" : "none",
                            opacity: position === 2 ? 1 : 0.5,
                        }}
                    >
                        <AdditionalDetails
                            additionalDetails={additionalDetails}
                            setAdditionalDetails={setAdditionalDetails}
                        />
                    </Box>

                    <Fade in={position > 0} timeout={500}>
                        <Button
                            onClick={moveLeft}
                            sx={{
                                position: "absolute",
                                left: "25%",
                                top: "45",
                                transform: "translateY(-50%)",
                                backgroundColor: theme.palette.menu.button,
                                color: "white",
                                border: "1px solid white",
                                borderRadius: "50%",
                                width: "50px",
                                height: "60px",
                                "&:hover": { backgroundColor: theme.palette.menu.button_hover },
                            }}
                        >
                            <ChevronLeft />
                        </Button>
                    </Fade>

                    <Fade in={position < 2} timeout={500}>
                        <Button
                            onClick={moveRight}
                            sx={{
                                position: "absolute",
                                right: "25%",
                                top: "45",
                                transform: "translateY(-50%)",
                                backgroundColor: theme.palette.menu.button,
                                color: "white",
                                border: "1px solid white",
                                borderRadius: "50%",
                                width: "50px",
                                height: "60px",
                                "&:hover": { backgroundColor: theme.palette.menu.button_hover },
                            }}
                        >
                            <ChevronRight />
                        </Button>
                    </Fade>
                </Box>
                <Fade in={formsFilled} timeout={700}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "1rem",
                            alignItems: "center",
                            marginBottom: "5rem",
                        }}
                    >
                        <CustomButton sx={{
                            width:"15rem",
                            backgroundColor:theme.palette.menu.submit_button,
                            boxShadow: `0 0 5px ${theme.palette.menu.submit_button}`,
                            "&:hover": {
                                backgroundColor: theme.palette.menu.submit_button_hover,
                                boxShadow: `0 0 10px ${theme.palette.menu.submit_button}`
                            },
                            }} 
                            onClick={AnalyzeResume}>
                            Analyze Resume
                            </CustomButton>
                        <CustomButton sx={{
                            width:"15rem",
                            backgroundColor:theme.palette.menu.submit_button,
                            boxShadow: `0 0 5px ${theme.palette.menu.submit_button}`,
                            "&:hover": {
                                backgroundColor: theme.palette.menu.submit_button_hover,
                                boxShadow: `0 0 10px ${theme.palette.menu.submit_button}`
                            },
                            }}  onClick={GenerateCL}>Generate Cover Letter</CustomButton>
                    </Box>
                </Fade>
            </Box>
            <Background />
        </>
    );
};

export default Upload;