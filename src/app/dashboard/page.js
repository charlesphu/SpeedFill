"use client";

import { Box, Typography } from "@mui/material";
import Background from "../components/Background";
import Title from "../components/Title";
import Container from "../components/Container";

const Dashboard = () => {
  return (
    <>
      <Box
        style={{
          width: "50%",
          margin: "0 auto",
          paddingTop: "2rem",
        }}>
        <Title
          secondaryText="Seamless Job Applications, Every Time"
          tertiaryText="Upload your resume and let AI help you land your dream job!"
        />
      </Box>
      <Container
        title="Your Infomation"
        subtitle="Manage your password and saved resume"
      />
      <Background imageUrl="/background.jpg" />
    </>
  );
};

export default Dashboard;
