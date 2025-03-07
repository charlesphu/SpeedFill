"use client";

import Background from "./components/Background";
import Title from "./components/Title";
import { NavBar, NavBarItem } from "./components/NavBar";

import { useTheme, Box, useMediaQuery } from "@mui/material";
import useAuth from "./hooks/useAuth";

// Home component serves as the main entry point of the application
const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Authentication context to manage user state
  const { user, logout } = useAuth();

  return (
    <>
      {/* Navigation bar with links based on user authentication state */}
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

      {/* Main content area with title and background */}
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
