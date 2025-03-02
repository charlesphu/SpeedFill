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
const CoverLetter = () => {
  const theme = useTheme();
  const router = useRouter();
  const [CoverLetter, setCoverLetter] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMostRecentResponse("Cover Letter");
      setCoverLetter(response.cover_letter);
    };

    fetchData();
  }, []);

  const [copyButtonText, setCopyButtonText] = useState("Copy Letter");
  const copyCoverLetter = () => {
    if (copyButtonText === "Copied!") return;
    navigator.clipboard.writeText(CoverLetter);

    setCopyButtonText("Copied!");
    setTimeout(() => {
      setCopyButtonText("Copy Letter");
    }, 1000);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}>
      {/* Title Component */}
      <Title sx={{ paddingTop: "2rem" }} />

      {/* Result Component */}
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
              {CoverLetter}
            </Typography>
          </Panel>
        </Container>
      </Box>

      {/* Control Buttons */}
      <Box
        width="100%"
        marginBottom="3rem"
        display="flex"
        justifyContent="center"
        gap="2rem">
        <Button
          icon="./Icons/Edit.svg"
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
          icon="./Icons/Reset.svg"
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
          onClick={() => router.push("")}>
          Regenerate
        </Button>
        <Button
          icon="./Icons/Copy.svg"
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
      </Box>

      {/* Navigation Bar */}
      <NavBar>
        <NavBarItem text="Home" src="/" />
        <NavBarItem text="Dashboard" src="/dashboard" />
        <NavBarItem text="Sign Out" src="/sign-out" />
      </NavBar>

      <Background imageUrl="/background.jpg" />
    </Box>
  );
};

export default CoverLetter;
