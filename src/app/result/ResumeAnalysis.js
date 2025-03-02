"use client";

import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import Title from "../components/Title";
import Container from "../components/Container";
import Section from "./Section";
import { useEffect, useState } from "react";
import { NavBar, NavBarItem } from "../components/NavBar";
import Background from "../components/Background";
import Button from "../components/Button";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/navigation";
import { getMostRecentResponse } from "../hooks/supabase/getfile";
const MatchSection = ({ score }) => {
  score = parseFloat(score);
  score = Math.max(0, Math.min(100, score));

  const getRating = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Great";
    if (score >= 50) return "Average";
    if (score >= 25) return "Bad";
    return "Poor";
  };

  const title = `Match Score - ${score}% (${getRating(score)})`;
  const subtitle =
    "Evaluates how well your resume aligns with the job description and its overall quality";

  //  Transition fill bar width on page load
  const [fillWidth, setFillWidth] = useState(0);

  useEffect(() => {
    setFillWidth(score);
  }, [score]);

  return (
    <Section title={title} subtitle={subtitle}>
      {/* Fill Bar */}
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
        {/* Intervals */}
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

        {/* Fill Bar */}
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

const StrengthsSection = ({ strengths }) => {
  const title = "Summary of Strengths";
  const subtitle =
    "Showcases your resume's standout skills and experiences for this role";

  return (
    <Section title={title} subtitle={subtitle} icon="./Icons/Star.svg">
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

const ImprovementSection = ({ improvements }) => {
  const title = "Areas for Improvement";
  const subtitle =
    "Suggests changes to increase resume clarity and maximize impact";

  return (
    <Section title={title} subtitle={subtitle} icon="./Icons/Pencil.svg">
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

const QuestionsSection = ({ questions }) => {
  const title = "Commonly Asked Questions";
  const subtitle =
    "Thoughtful responses to common interview questions, personalized to your experience";

  return (
    <Section title={title} subtitle={subtitle} icon="./Icons/Speech.svg">
      {questions.map((entry, index) => (
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

const ResumeAnalysis = () => {
  const theme = useTheme();
  const router = useRouter();
  const [Match_Score, setMatchScore] = useState(null);
  const [Strengths, setStrengths] = useState(["Loading.."]);
  const [Improvements, setImprovements] = useState(["Loading.."]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getMostRecentResponse("Resume Analysis");
      setStrengths(response.strengths);
      setMatchScore(response.match_percentage);
      setImprovements(response.areas_for_improvement);
      // console.log(response);
    };

    fetchData();
  }, []);

  const TEST_QUESTIONS = [
    {
      question: "Tell me about yourself",
      answer:
        "I’m a marketing professional with over 5 years of experience in digital marketing, content strategy, and data-driven campaign management. I’ve had the opportunity to lead cross-functional teams, launch successful marketing initiatives, and drive significant engagement across various platforms. I’m particularly passionate about understanding customer behavior through data and using those insights to create impactful strategies. Outside of work, I’m continuously learning about emerging trends in marketing and how they can be applied to innovative business solutions.",
    },
    {
      question: "Why are you interested in this role?",
      answer:
        "This position caught my attention because it directly aligns with my professional background and career goals. I have a strong foundation in project management and process optimization, which I know are essential for this role. The opportunity to work with a team that values creativity and efficiency is something I’m excited about. I’ve been following your company’s growth and feel that my skill set in streamlining operations and leading diverse teams would make a meaningful impact here.",
    },
  ];

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
          title="Your Resume Analysis"
          subtitle="Polish your resume with expert insights!"
          sx={{
            maxWidth: "50rem",
          }}>
          <MatchSection score={Match_Score} />
          <StrengthsSection strengths={Strengths} />
          <ImprovementSection improvements={Improvements} />
          <QuestionsSection questions={TEST_QUESTIONS} />
        </Container>
      </Box>

      {/* Edit Button */}
      <Box
        width="100%"
        marginBottom="3rem"
        display="flex"
        justifyContent="center">
        <Button
          icon="./Icons/Edit.svg"
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
      <NavBar>
        <NavBarItem text="Home" src="/" />
        <NavBarItem text="Dashboard" src="/dashboard" />
        <NavBarItem text="Sign Out" src="/sign-out" />
      </NavBar>

      <Background imageUrl="/background.jpg" />
    </Box>
  );
};

export default ResumeAnalysis;
