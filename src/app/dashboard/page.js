"use client";

import { Box, Typography } from "@mui/material";
import Background from "../components/Background";
import Title from "../components/Title";
import AccountPanel from "./AccountPanel";
import ActivityPanel from "./ActivityPanel";
import Image from "next/image";

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

      <Box display="flex" justifyContent="center" gap="1rem" marginTop="5rem">
        <AccountPanel />
        <Box display="flex" alignItems="center">
          <Image
            src="/icons/scribbles/vertical.svg"
            alt="scribble"
            width={100}
            height={200}
            draggable="false"
            style={{ userSelect: "none" }}
          />
        </Box>
        <ActivityPanel />
      </Box>

      <Background imageUrl="/background.jpg" />
    </>
  );
};

export default Dashboard;
