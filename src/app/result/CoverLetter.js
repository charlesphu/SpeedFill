"use client";

import { useTheme } from "@emotion/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { Box, Typography } from "@mui/material";
import Button from "../components/Button";
import { NavBar, NavBarItem } from "../components/NavBar";
import Background from "../components/Background";

import Title from "../components/Title";
import Container from "../components/Container";
import Panel from "../components/Panel";

import { getMostRecentResponse } from "../hooks/supabase/getfile";
import { generatePDF } from "../hooks/pdfToText";
import { useSearchParams } from "next/navigation";

const CoverLetter = () => {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  // State for storing cover letter content and copy button text
  const [coverLetterContent, setCoverLetterContent] = useState("Loading...");
  const [copyButtonText, setCopyButtonText] = useState("Copy Letter");

  // Fetch cover letter content when component mounts

  // Fetch resume analysis data on component mount
  useEffect(() => {
    const fetchData = async () => {
      var response;
      if (id != null) {
        response = await getResponseById(id);
      } else {
        response = await getMostRecentResponse("Cover Letter");
      }
      if (response == null) {
        router.push("/upload");
      }
      setStrengths(response.strengths);
      setMatchScore(response.match_percentage);
      setImprovements(response.areas_for_improvement);
      // console.log(response);
    };

    fetchData();
  }, []);

  // Handle copy to clipboard functionality with feedback
  const copyCoverLetter = () => {
    if (copyButtonText === "Copied!") return;
    navigator.clipboard.writeText(coverLetterContent);

    setCopyButtonText("Copied!");
    setTimeout(() => {
      setCopyButtonText("Copy Letter");
    }, 1000);
  };

  // Generate and trigger download of cover letter as text file
  const downloadCoverLetter = async () => {
    const blob = await generatePDF(coverLetterContent);
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "cover_letter.pdf"; // Default filename

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}>
      {/* Title Component */}
      <Title sx={{ paddingTop: "2rem" }} />

      {/* Result Component - Displays the generated cover letter */}
      <Box
        sx={{
          marginTop: "5rem",
          marginBottom: "3rem",
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
        }}>
        <Container
          title="Your Cover Letter"
          subtitle="Introducing your unique professional intro, crafted to impress!"
          sx={{
            maxWidth: "50rem",
          }}>
          <Panel
            sx={{
              maxWidth: "50rem",
            }}>
            <Typography
              variant="body1"
              color="text"
              sx={{ whiteSpace: "pre-line" }}>
              {coverLetterContent}
            </Typography>
          </Panel>
        </Container>
      </Box>

      {/* Control Buttons - Actions for editing, copying and downloading the letter */}
      <Box
        width="100%"
        marginBottom="3rem"
        display="flex"
        justifyContent="center"
        gap="2rem">
        <Button
          icon="./icons/Edit.svg"
          sx={{
            width: "12rem",
            transition: "transform 0.1s",
            backgroundColor: theme.palette.menu.destructive.main,
            boxShadow: `0 0 10px ${theme.palette.menu.destructive.main}`,
            borderRadius: "15px",

            "&:hover": {
              transform: "scale(1.1)",
              backgroundColor: theme.palette.menu.destructive.hover,
              boxShadow: `0 0 15px ${theme.palette.menu.destructive.hover}`,
            },
            "&:active": {
              transform: "scale(0.95)",
            },
          }}
          onClick={() => router.push("/upload")}>
          Edit Details
        </Button>
        <Button
          icon="./icons/Copy.svg"
          sx={{
            width: "12rem",
            transition: "transform 0.1s",
            backgroundColor: theme.palette.menu.submit.main,
            boxShadow: `0 0 10px ${theme.palette.menu.submit.main}`,
            borderRadius: "15px",

            "&:hover": {
              transform: "scale(1.1)",
              backgroundColor: theme.palette.menu.submit.hover,
              boxShadow: `0 0 15px ${theme.palette.menu.submit.hover}`,
            },
            "&:active": {
              transform: "scale(0.95)",
            },
          }}
          onClick={copyCoverLetter}>
          {copyButtonText}
        </Button>
        <Button
          icon="./icons/file.svg"
          sx={{
            width: "12rem",
            transition: "transform 0.1s",
            backgroundColor: theme.palette.menu.submit.main,
            boxShadow: `0 0 10px ${theme.palette.menu.submit.main}`,
            borderRadius: "15px",

            "&:hover": {
              transform: "scale(1.1)",
              backgroundColor: theme.palette.menu.submit.hover,
              boxShadow: `0 0 15px ${theme.palette.menu.submit.hover}`,
            },
            "&:active": {
              transform: "scale(0.95)",
            },
          }}
          onClick={downloadCoverLetter}>
          Download
        </Button>
      </Box>

      {/* Navigation Bar - App navigation links */}
      <NavBar>
        <NavBarItem text="Home" src="/" />
        <NavBarItem text="Dashboard" src="/dashboard" />
        <NavBarItem text="Sign Out" src="/sign-out" />
      </NavBar>

      {/* Background image for the page */}
      <Background imageUrl="/background.jpg" />
    </Box>
  );
};

export default CoverLetter;
