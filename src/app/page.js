"use client";

import { useTheme, Box, useMediaQuery } from "@mui/material";
import Background from "./components/Background";
import Title from "./components/Title";
import { NavBar, NavBarItem } from "./components/NavBar";

import useAuth from "./hooks/useAuth";

const Home = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { user, logout, isLoadingUser } = useAuth();

  return (
    <>
      <NavBar>
        {user ? (
          <>
            <NavBarItem text="Upload" src="/upload" />
            <NavBarItem text="Dashboard" src="/dashboard" />
            <NavBarItem text="Sign Out" onClick={logout} />
          </>
        ) : (
          <NavBarItem text="Sign In" src="/auth" />
        )}
      </NavBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
          textAlign: "center",
          padding: "2rem",
        }}>
        <Title variant={isSmallScreen ? "small" : "large"} />
      </Box>
      <Background />
    </>
  );
};

export default Home;
