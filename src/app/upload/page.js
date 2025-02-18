"use client";

import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";

import Background from "../components/Background";
import Title from "../components/Title";
import ResumeUpload from "./ResumeUpload";
import JobDescriptionUpload from "./JobDescriptionUpload";
import AdditionalDetails from "./AdditionalDetails";

import { auth } from "../firebase";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const Upload = () => {
    const [user, setUser] = useState(null);
    const [position, setPosition] = useState(0); // 0 = left, 1 = middle, 2 = right

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

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
                        marginBottom: "3rem"
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
                        height: "75vh",
                        minHeight: "200px",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        overflow: "hidden",
                        paddingBottom: "10rem"
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
                                        ? "translateX(-90%) scale(0.6)"
                                        : "translateX(-180%) scale(0.6)",
                            transition: "transform 1s ease-in-out, scale 0.5s ease",
                        }}
                    >
                        <ResumeUpload />
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
                                    ? "translateX(90%) scale(0.6)"
                                    : position === 1
                                        ? "translateX(0) scale(1)"
                                        : "translateX(-90%) scale(0.6)",
                            transition: "transform 1s ease-in-out, width 0.5s ease, scale 0.5s ease",
                        }}
                    >
                        <JobDescriptionUpload />
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
                                    ? "translateX(180%) scale(0.6)"
                                    : position === 1
                                        ? "translateX(90%) scale(0.6)"
                                        : "translateX(0) scale(1)",
                            transition: "transform 1s ease-in-out, scale 0.5s ease",
                        }}
                    >
                        <AdditionalDetails />
                    </Box>

                    <Button
                        onClick={moveLeft}
                        disabled={position === 0}
                        sx={{
                            position: "absolute",
                            left: "5%",
                            top: "50%",
                            transform: "translateY(-50%)",
                            backgroundColor: position === 0 ? "gray" : "black",
                            color: "white",
                            "&:hover": { backgroundColor: "darkgray" },
                        }}
                    >
                        <ChevronLeft />
                    </Button>

                    <Button
                        onClick={moveRight}
                        disabled={position === 2}
                        sx={{
                            position: "absolute",
                            right: "5%",
                            top: "50%",
                            transform: "translateY(-50%)",
                            backgroundColor: position === 2 ? "gray" : "black",
                            color: "white",
                            "&:hover": { backgroundColor: "darkgray" },
                        }}
                    >
                        <ChevronRight />
                    </Button>
                </Box>
            </Box>
            <Background />
        </>
    );
};

export default Upload;
