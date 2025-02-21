"use client";

import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import Title from "../components/Title";
import Container from "../components/Container";
import Panel from "../components/Panel";
import Section from "./Section";
import { useEffect, useState } from "react";
import { NavBar, NavBarItem } from "../components/NavBar";
import Background from "../components/Background";

const MatchSection = ({ score, evaluation }) => {
  score = Math.max(0, Math.min(100, score));

  const title = `Match Score - ${score}% (${evaluation})`;
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
          color: "text.main",
        }}>
        {strengths.map((text, index) => (
          <ListItem
            key={index}
            sx={{
              display: "list-item",
              paddingLeft: "0",
            }}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Section>
  );
};

const Result = () => {
  const TEST_STRENGTHS = [
    "Extensive experience in project management, successfully leading teams to deliver projects on time and within budget, while maintaining high standards of quality and client satisfaction.",
    "Proficient in data analysis, utilizing advanced tools like Excel and Python to extract valuable insights that inform strategic decision-making and improve business outcomes.",
    "Highly skilled in using industry-standard software and platforms, such as Salesforce, Tableau, and Microsoft Office Suite, to streamline workflows and enhance productivity.",
  ];
  const TEST_MATCH_SCORE = 23;
  const TEST_MATCH_EVALUATION = "Needs Improvement";

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
          marginBottom: "2rem",

          display: "flex",
          width: "100%",

          justifyContent: "center",
          alignContent: "center",
        }}>
        <Container
          title="Your Resume Analysis"
          subtitle="Polish your resume with expert insights!"
          sx={{
            maxWidth: "45rem",
          }}>
          <MatchSection
            score={TEST_MATCH_SCORE}
            evaluation={TEST_MATCH_EVALUATION}
          />
          <StrengthsSection strengths={TEST_STRENGTHS} />
        </Container>
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

export default Result;
