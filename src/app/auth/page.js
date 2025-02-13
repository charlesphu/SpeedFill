"use client";

import { Box, useTheme, useMediaQuery } from "@mui/material";
import Background from "../components/Background";
import Title from "../components/Title";
import FadeIn from "../components/utils/FadeIn";
import AuthForm from "./authForm";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Auth = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 1100px)");

  const [loading, setLoading] = useState(true);

  // redirect if user is already logged in.
  // copy/paste this logic and inverse it to  make page that redirects if user isnt logged in!
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        redirect("/");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
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

      <Background />
    </>
  );
};

export default Auth;
