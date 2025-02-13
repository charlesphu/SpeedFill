"use client";

import { Box, Typography } from "@mui/material";
import { useState } from "react";

import Background from "../components/Background";
import Title from "../components/Title";
import Container from "../components/Container";
import Panel from "../components/Panel";
import ActionButton from "./ActionButton";

const Dashboard = () => {
  const [isShowingPassword, setShowPassword] = useState(false);
  const [isEditingPassword, setEditPassword] = useState(false);

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
        sx={{ marginTop: "3rem", width: "25rem" }}>
        <Panel>
          <Typography variant="h5" color="title">
            Email Address:
          </Typography>
          <Typography variant="body1" color="title">
            email@domain.com
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginTop="0.8rem"
            marginBottom="-0.2rem">
            <Box>
              <Typography variant="h5" color="title">
                Password:
              </Typography>
              <Typography variant="body1" color="title">
                {isShowingPassword ? "your_password" : "•••••••••••••••"}
              </Typography>
            </Box>
            <Box display="flex" gap="0.8rem">
              <ActionButton
                icon={
                  isShowingPassword
                    ? "/icons/Striked_Eye.svg"
                    : "/icons/Eye.svg"
                }
                onClick={() => setShowPassword(!isShowingPassword)}
              />
              <ActionButton icon="/icons/Edit.svg" />
            </Box>
          </Box>
        </Panel>
      </Container>

      <Background imageUrl="/background.jpg" />
    </>
  );
};

export default Dashboard;
