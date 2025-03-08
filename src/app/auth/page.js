"use client";

import { Box, useTheme, useMediaQuery } from "@mui/material";
import Background from "../components/Background";
import Title from "../components/Title";
import FadeIn from "../components/utils/FadeIn";
import AuthForm from "./AuthForm";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { getUser } from "../hooks/supabase/auth";

const Auth = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 1300px)");

  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Redirect if user is already logged in.
  // copy/paste this logic and inverse it to  make page that redirects if user isnt logged in!
  useEffect(() => {
    const checkIsLogin = async () => {
      const user = await getUser();
      if (user != null) {
        redirect("/");
      } else {
        setLoading(false);
      }
    };

    checkIsLogin();
  }, []);

  // Loading state to prevent flickering
  if (loading) {
    return null;
  }

  return (
    <>
      {/* Conditional rendering based on screen size */}
      {/* For small screens, display the AuthForm component in full screen */}
      {/* For larger screens, display the Title component and AuthForm side by side */}
      {isSmallScreen ? (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.palette.menu.main,
          }}>
          <FadeIn timeout={2000}>
            <AuthForm />
          </FadeIn>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            minWidth: "800px",
            minHeight: "600px",
            position: "relative",
            overflow: "hidden",
            flexDirection: "row",
          }}>
          <Box
            sx={{
              width: "60vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "0vw",
            }}>
            <FadeIn timeout={1000}>
              <Title variant="large" />
            </FadeIn>
          </Box>

          {/* AuthForm component for login/signup */}
          <Box
            sx={{
              width: "40vw",
              minHeight: "100vh",
              height: "auto",
              backgroundColor: theme.palette.menu.main,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "1rem",
            }}>
            <FadeIn timeout={2000}>
              <AuthForm />
            </FadeIn>
          </Box>
        </Box>
      )}

      {/* Background component for the gradient effect */}
      <Background />
    </>
  );
};

export default Auth;
