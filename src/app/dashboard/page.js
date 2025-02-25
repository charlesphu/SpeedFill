"use client";

import { Box, Typography, useMediaQuery } from "@mui/material";
import Background from "../components/Background";
import Title from "../components/Title";
import AccountPanel from "./AccountPanel";
import ActivityPanel from "./ActivityPanel";
import Image from "next/image";
import { NavBar, NavBarItem } from "../components/NavBar";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const isSmallScreen = useMediaQuery("(max-width: 1200px)");
  const { user, logout } = useAuth();

  return (
    <>
      <Box
        sx={{
          width: "50%",
          margin: "0 auto",
          paddingTop: "2rem",
        }}>
        <Title />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        flexWrap={isSmallScreen ? "wrap" : "nowrap"}
        gap={isSmallScreen ? "3rem" : "1rem"}
        marginTop="5rem"
        flexDirection={isSmallScreen ? "column" : "row"}>
        <AccountPanel
          sx={
            isSmallScreen
              ? { margin: "auto auto" }
              : { marginTop: "auto", marginBottom: "auto" }
          }
        />
        {!isSmallScreen && (
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
        )}
        <ActivityPanel
          sx={
            isSmallScreen
              ? { margin: "auto auto", marginBottom: "2rem" }
              : { marginBottom: "2rem" }
          }
        />
      </Box>

      <NavBar>
        <NavBarItem text="Home" src="/" />
        <NavBarItem text="Upload" src="/upload" />
        <NavBarItem text="Sign Out" src="/" onClick={logout} />
      </NavBar>
      <Background imageUrl="/background.jpg" />
    </>
  );
};

export default Dashboard;
