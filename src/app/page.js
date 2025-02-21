"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useTheme,
  Box,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import Background from "./components/Background";
import Title from "./components/Title";
import CustomButton from "./components/Button";

import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { NavBar, NavBarItem } from "./components/NavBar";

const Home = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleButtonClick = () => {
    router.push("/upload");
  };

  const handleLogout = async () => {
    console.log("pressed");
    try {
      await signOut(auth);
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <NavBar>
        <NavBarItem text="Home" src="/" />
        <NavBarItem text="Upload" src="/upload" />
        <NavBarItem text="Dashboard" src="/dashboard" />
        {user ? (
          <>
            <NavBarItem text={user.email} src="#" />
            <Button
              onClick={handleLogout}
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
            Sign Up/Login
          </Button>
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
