"use client";

import Title from "../components/Title";
import Container from "../components/Container";
import Section from "./Section";
import Background from "../components/Background";
import Button from "../components/Button";

import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { NavBar, NavBarItem } from "../components/NavBar";

import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getMostRecentResponse,
  getResponseById,
} from "../hooks/supabase/getfile";

import { useSearchParams } from "next/navigation";

// Component that displays the match score with a visual progress bar
const MatchSection = ({ score }) => {
  // Ensure score is properly formatted and bounded between 0-100
  let matchScore = parseFloat(score);
  if (isNaN(matchScore)) {
    matchScore = 0;
  } else {
    matchScore = Math.max(0, Math.min(100, matchScore));
  }

  // Convert numeric score to qualitative rating
  const getRating = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Great";
    if (score >= 50) return "Average";
    if (score >= 25) return "Bad";
    return "Poor";
  };

  const title = `Match Score - ${matchScore}% (${getRating(matchScore)})`;
  const subtitle =
    "Evaluates how well your resume aligns with the job description and its overall quality";

  // State for animating progress bar on load
  const [fillWidth, setFillWidth] = useState(0);

  useEffect(() => {
    setFillWidth(matchScore);
  }, [matchScore]);

  return (
    <Section title={title} subtitle={subtitle}>
      {/* Progress bar container */}
      <Box
        sx={{
          width: "100%",
          height: "2rem",
          borderRadius: "7px",
          marginTop: "1rem",
          backgroundColor: "primary.main",
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        {/* Tick marks at 10% intervals */}
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((index) => (
          <Box
            key={index}
            sx={{
              visibility: index === 0 || index === 100 ? "hidden" : "visible",
              height: "60%",
              width: "2px",
              zIndex: 1,
              transition: "background-color 0.5s ease",
              backgroundColor:
                index > fillWidth ? "accent.light" : "primary.main",
            }}
          />
        ))}

        {/* Animated fill indicator */}
        <Box
          sx={{
            position: "absolute",
            width: `${fillWidth}%`,
            height: "100%",
            borderRadius: "7px",
            backgroundColor: "accent.light",
            transition: "width 0.5s ease",
          }}
        />
      </Box>
    </Section>
  );
};

// Component that displays resume strengths as bullet points
const StrengthsSection = ({ strengths }) => {
  const title = "Summary of Strengths";
  const subtitle =
    "Showcases your resume's standout skills and experiences for this role";

  return (
    <Section title={title} subtitle={subtitle} icon="./icons/Star.svg">
      <List
        sx={{
          listStyleType: "disc",
          paddingLeft: "1.5rem",
          paddingTop: "0rem",
          paddingBottom: "0rem",
          color: "text.main",
          marginTop: "0.3rem",
        }}>
        {strengths.map((text, index) => (
          <ListItem
            key={index}
            sx={{
              display: "list-item",
              paddingLeft: "0",
            }}>
            <ListItemText
              primary={text}
              primaryTypographyProps={{ variant: "body1" }}
              sx={{
                marginTop: "0rem",
                marginBottom: "0rem",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Section>
  );
};

// Component that displays areas needing improvement as bullet points
const ImprovementSection = ({ improvements }) => {
  const title = "Areas for Improvement";
  const subtitle =
    "Suggests changes to increase resume clarity and maximize impact";

  return (
    <Section title={title} subtitle={subtitle} icon="./icons/Pencil.svg">
      <List
        sx={{
          listStyleType: "disc",
          paddingLeft: "1.5rem",
          paddingTop: "0rem",
          paddingBottom: "0rem",
          color: "text.main",
          marginTop: "0.3rem",
        }}>
        {improvements.map((text, index) => (
          <ListItem
            key={index}
            sx={{
              display: "list-item",
              paddingLeft: "0",
            }}>
            <ListItemText
              primary={text}
              primaryTypographyProps={{ variant: "body1" }}
              sx={{
                marginTop: "0rem",
                marginBottom: "0rem",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Section>
  );
};

// Component that displays practice interview questions with suggested answers
const QuestionsSection = ({ questions }) => {
  const title = "Commonly Asked Questions";
  const subtitle =
    "Thoughtful responses to common interview questions, personalized to your experience";

  return (
    <Section title={title} subtitle={subtitle} icon="./icons/Speech.svg">
      {questions?.map((entry, index) => (
        <Box
          key={index}
          sx={{
            marginTop: "1rem",
            display: "flex",
            gap: "0.8rem",
            flexDirection: "column",
          }}>
          <Typography
            variant="h5"
            color="title"
            sx={{
              padding: "0 0.5rem",
            }}>
            {entry.question}
          </Typography>
          <Typography
            variant="body1"
            color="text.main"
            sx={{
              padding: "0 0.5rem",
            }}>
            {entry.answer}
          </Typography>
        </Box>
      ))}
    </Section>
  );
};

// Main component for the Resume Analysis page
const ResumeAnalysis = () => {
  const theme = useTheme();
  const router = useRouter();

  // Get the 'id' parameter from the URL query string
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // State for storing resume analysis data
  const [matchScore, setMatchScore] = useState(null);
  const [strengths, setStrengths] = useState(["Loading.."]);
  const [improvements, setImprovements] = useState(["Loading.."]);
  const [interviewQuestions, setInterviewQuestions] = useState([]);

  // Fetch resume analysis data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const response = await (id != null
        ? getResponseById(id)
        : getMostRecentResponse("Resume Analysis"));

      if (response == null) {
        router.push("/upload");
      } else {
        setStrengths(response.strengths);
        setMatchScore(response.match_percentage);
        setImprovements(response.areas_for_improvement);
        setInterviewQuestions(response.interview_questions);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}>
      {/* Page title */}
      <Title sx={{ paddingTop: "2rem" }} />

      {/* Main content container */}
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
          title="Your Resume Analysis"
          subtitle="Polish your resume with expert insights!"
          sx={{
            maxWidth: "50rem",
          }}>
          <MatchSection score={matchScore} />
          <StrengthsSection strengths={strengths} />
          <ImprovementSection improvements={improvements} />
          <QuestionsSection questions={interviewQuestions} />
        </Container>
      </Box>

      {/* Edit button for modifying resume details */}
      <Box
        width="100%"
        marginBottom="3rem"
        display="flex"
        justifyContent="center">
        <Button
          icon="./icons/Edit.svg"
          sx={{
            width: "12rem",
            transition: "transform 0.1s",
            backgroundColor: theme.palette.menu.destructive.main,
            boxShadow: `0 0 5px ${theme.palette.menu.destructive.main}`,
            borderRadius: "15px",

            "&:hover": {
              transform: "scale(1.1)",
              backgroundColor: theme.palette.menu.destructive.hover,
              boxShadow: `0 0 10px ${theme.palette.menu.destructive.hover}`,
            },
            "&:active": {
              transform: "scale(0.95)",
            },
          }}
          onClick={() => router.push("/upload")}>
          Edit Details
        </Button>
      </Box>

      {/* Navigation bar */}
      <NavBar>
        <NavBarItem text="Dashboard" src="/dashboard" />
        <NavBarItem text="Sign Out" src="/sign-out" />
      </NavBar>

      {/* Background image */}
      <Background imageUrl="/background.jpg" />
    </Box>
  );
};

export default ResumeAnalysis;
