"use client";

import { Box, Typography } from "@mui/material";
import Background from "../components/Background";
import Title from "../components/Title";
import Container from "../components/Container";
import Panel from "../components/Panel";

const Dashboard = () => {
  return (
    <>
      <Box
        sx={{
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
        sx={{ marginTop: "3rem", width: "60%" }}>
        <Panel>
          <Typography variant="h5" color="title">
            Email Address:
          </Typography>
          <Typography variant="body1" color="title">
            email@domain.com
          </Typography>
          <Typography variant="h5" color="title" marginTop="0.8rem">
            Password:
          </Typography>
          <Typography variant="body1" color="title" marginBottom="-0.4rem">
            **********
          </Typography>
        </Panel>
      </Container>

      <Background imageUrl="/background.jpg" />
    </>
  );
};

export default Dashboard;
