import {
  Box,
  Typography,
  useTheme,
  Fade,
  CircularProgress,
} from "@mui/material";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import Divider from "../components/Divider";
import {
  signUpNewUser,
  loginUser,
  handleSignInWithGoogle,
  supabase,
} from "../hooks/supabase/auth";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Component to handle authentication form
const AuthForm = () => {
  const theme = useTheme();
  const router = useRouter();

  // State to manage login/signup toggle
  const [isLogin, setIsLogin] = useState(true);

  // State to manage form inputs and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fade, setFade] = useState(true);
  const [error, setError] = useState("");
  const [waitingForConfirmation, setWaitingForConfirmation] = useState(true);
  // Function to handle form submission
  const onAuthFormSubmit = async (e) => {
    e.preventDefault();

    // Try to authenticate the user
    // If isLogin is true, call loginUser, otherwise call signUpNewUser
    try {
      let result;
      if (isLogin) {
        result = await loginUser(email, password);
      } else {
        result = await signUpNewUser(email, password);
        if (!result.error) {
          setWaitingForConfirmation(true);
          loginUser(email, password);
        }
      }

      if (result?.error) {
        throw new Error(result.error.message);
      } else if (
        result != "Please check your email for the confirmation link"
      ) {
        router.push("/");
      }
    } catch (error) {
      setError(`${isLogin ? "Login" : "Signup"} failed. ${error.message}`);
    }
  };

  useEffect(() => {
    const checkEmailConfirmation = async () => {
      console.log("email: ", email, "password", password);
      if (email === "" || password === "") return;
      const user = loginUser(email, password);
      console.log(
        "Checking email confirmation..."
        // user.user.email_confirmed_at
      );
      if (user?.email_confirmed_at) {
        setWaitingForConfirmation(false);
        console.log("User confirmed email!");
      }
    };

    // Poll every 5 seconds
    const interval = setInterval(checkEmailConfirmation, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Switch between login / signup
  const handleToggleAuth = () => {
    setWaitingForConfirmation(false);
    setFade(false);
    setTimeout(() => {
      setIsLogin((prev) => !prev);
      setFade(true);
    }, 300);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      {waitingForConfirmation ? (
        // New Confirmation Box
        <Box
          sx={{
            width: "50%",
            maxWidth: "400px",
            minWidth: "400px",
            padding: "20px",
            borderRadius: "5px",
            textAlign: "center",
            backgroundColor: "white",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}>
          <Typography variant="h2">Check Your Email</Typography>
          <CircularProgress
            sx={{ marginTop: "20px", padding: "10px" }}
            size="75px"
          />
          <Typography variant="body1" sx={{ marginTop: "10px" }}>
            We have sent a confirmation email to your inbox. Please verify your
            email before logging in.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            width: "50%",
            maxWidth: "400px",
            minWidth: "400px",
            padding: "20px",
            borderRadius: "5px",
          }}>
          {/* Error message display */}
          {error && (
            <Box
              sx={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: theme.palette.error.main,
                color: "white",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 10,
                fontSize: "14px",
              }}>
              <Typography>{error}</Typography>
            </Box>
          )}

          {/* Form title and description */}
          <Fade in={fade} timeout={500}>
            <Typography
              variant="h2"
              sx={{
                textAlign: "left",
                color: theme.palette.text.main,
                fontWeight: "bold",
              }}>
              {isLogin ? "Welcome Back" : "Getting Started"}
            </Typography>
          </Fade>

          {/* Description text */}
          <Fade in={fade} timeout={500}>
            <Typography
              variant="body1"
              sx={{
                textAlign: "left",
                color: theme.palette.text.main,
                marginBottom: "0.8rem",
              }}>
              Enter your details to continue
            </Typography>
          </Fade>

          {/* Authentication form */}
          <Fade in={fade} timeout={500}>
            <Box position="relative">
              <form onSubmit={onAuthFormSubmit}>
                <TextArea
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <TextArea
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {/* Conditional rendering for "Forgot Password?" link */}
                {isLogin && (
                  <Box sx={{ width: "100%", textAlign: "right" }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "1rem",
                        "& a": {
                          color: theme.palette.text.main,
                          textDecoration: "none",
                          cursor: "pointer",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        },
                      }}>
                      <a href="/forgot-password">Forgot Password?</a>
                    </Typography>
                  </Box>
                )}

                {/* Submit button */}
                <Button variant="h2" type="submit" sx={{ margin: "1rem 0" }}>
                  {isLogin ? "Sign In" : "Sign Up"}
                </Button>

                <Divider />

                {/* Google sign-in button */}
                <Button
                  variant="outlined"
                  onClick={handleSignInWithGoogle}
                  sx={{
                    margin: "1rem 0",
                    borderRadius: "5px",
                    fontWeight: "400",
                    backgroundColor: "white",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    color: theme.palette.text.google_text,
                    border: `1px solid ${theme.palette.text.google_border}`,
                    "&:hover": {
                      backgroundColor: theme.palette.menu.google_hover,
                    },
                  }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="1.5rem"
                    height="1.5rem">
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                  </svg>
                  Sign in with Google
                </Button>
              </form>
            </Box>
          </Fade>
        </Box>
      )}
      {/* Toggle between login and signup */}
      <Typography
        variant="body1"
        align="center"
        position="absolute"
        sx={{
          bottom: "1rem",
          color: theme.palette.text.secondary,
          fontWeight: "normal",
          cursor: "pointer",
          "& span": {
            fontWeight: "bold",
            textDecoration: "underline",
          },
        }}
        onClick={handleToggleAuth}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span>{isLogin ? "Sign Up" : "Login"}</span>
      </Typography>
    </Box>
  );
};

export default AuthForm;
