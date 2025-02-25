"use client";

import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Background from "./components/Background";
import Title from "./components/Title";

import { auth } from "./hooks/firebase/firebaseConfig";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const Home = () => {
  const [user, setUser] = useState(null);
  // TODO: if user is logged in & has a pdf attribute, change position to 1 and autofill the pdf stuff.
  const [position, setPosition] = useState(0); // 0 = left, 1 = middle, 2 = right
  const [isSingleView, setIsSingleView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSingleView(window.innerWidth < 800);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const moveLeft = () => {
    if (position > 0) {
      setPosition(position - 1);
    }
  };

  const moveRight = () => {
    if (position < 2) {
      setPosition(position + 1);
    }
  };

  return (
    <>
      <Background />
    </>
  );
};

export default Home;
