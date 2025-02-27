"use client";

import { useTheme } from "@emotion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Box, Typography } from "@mui/material";
import Button from "../components/Button";
import { NavBar, NavBarItem } from "../components/NavBar";
import Background from "../components/Background";

import Title from "../components/Title";
import Container from "../components/Container";
import Panel from "../components/Panel";

const CoverLetter = () => {
  const theme = useTheme();
  const router = useRouter();

  const TEST_COVER_LETTER = `[First and last name]\n[Date]\n[Name of employer]\n[Organization name]\nDear [Hiring manager's name],\n\n[Greet the hiring manager and state your name as well as the position you're applying for. These second and third sentences can mention how you found the position and express enthusiasm for the job. You can also mention if you heard about the position from a friend or if a colleague referred you.]\n\n[This first sentence in your second paragraph can introduce the skills you've gained from educational courses, volunteer experience or extracurricular activities. You can feature examples of these specific skills and tie together how you can apply them to this job position during these next few sentences. Mention any other related achievements or awards and how they may benefit the company.]\n\n[Your next paragraph can explain why you're the best candidate for the role. Mention any details you noticed on their website that you believe reflect your passion or motivations. You can also explain your dedication to learning more about the role and you're willingness to develop new skills in the position.]\n\n[In your closing paragraph, explain your excitement for the role one last time. Thank the employer for their time and request an interview. Mention that you look forward to hearing from them soon.]\n\nSincerely,\n[Your full name]`;

  const [copyButtonText, setCopyButtonText] = useState("Copy Letter");
  const copyCoverLetter = () => {
    if (copyButtonText === "Copied!") return;
    navigator.clipboard.writeText(TEST_COVER_LETTER);

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
              {TEST_COVER_LETTER}
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
