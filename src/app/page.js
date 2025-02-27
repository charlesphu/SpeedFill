"use client";

import { useTheme, Box, Button, useMediaQuery } from "@mui/material";
import Background from "./components/Background";
import Title from "./components/Title";
import { NavBar, NavBarItem } from "./components/NavBar";

import { useRouter } from "next/navigation";
import useAuth from "./hooks/useAuth";

const Home = () => {
  const router = useRouter();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { user, logout } = useAuth();

  return (
    <>
      <NavBar>
        {user ? (
          <>
            {/* <NavBarItem text={user.email} src="#" /> */}
            <NavBarItem text="Upload" src="/upload" />
            <NavBarItem text="Dashboard" src="/dashboard" />
            <Button
              onClick={logout}
              sx={{
                borderRadius: "10px",
                backgroundColor: theme.palette.menu.textarea,
                color: "white",
                height: "3rem",
                border: "1px solid white",
                boxShadow: `0 0 10px ${theme.palette.menu.textarea}`,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: `0 0 20px ${theme.palette.menu.main}`,
                },
              }}>
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <NavBarItem text="Demo" src="/upload" />
            <Button
              onClick={() => router.push("/auth")}
              sx={{
                borderRadius: "10px",
                backgroundColor: theme.palette.menu.textarea,
                color: "white",
                height: "3rem",
                border: "1px solid white",
                boxShadow: `0 0 10px ${theme.palette.menu.textarea}`,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: `0 0 20px ${theme.palette.menu.main}`,
                },
              }}>
              Sign In
            </Button>
          </>
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
