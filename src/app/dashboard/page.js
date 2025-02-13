"use client";

import { Box, Typography } from "@mui/material";
import Background from "../components/Background";
import Title from "../components/Title";
import AccountPanel from "./AccountPanel";

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

      <AccountPanel />

      <Background imageUrl="/background.jpg" />
    </>
  );
};

export default Dashboard;
