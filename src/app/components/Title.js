"use client";

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";

import { useRouter } from "next/navigation";

const Title = ({ variant, sx }) => {
  const secondaryText = "Seamless Job Applications, Every Time";
  const tertiaryText =
    "Upload your resume and let AI help you land your dream job!";

  const theme = useTheme();
  const router = useRouter();

  // Hard code the sizes for the large variant, can't multiply rem
  const h1Size = variant === "large" ? "8rem" : theme.typography.h1.fontSize;
  const h2Size = variant === "large" ? "2.5rem" : theme.typography.h2.fontSize;
  const h3Size = variant === "large" ? "1.9rem" : theme.typography.h3.fontSize;

  const iconSize = variant === "large" ? "7rem" : "3.5rem";
  const textAlignment = variant === "large" ? "left" : "center";

  // Make the smaller centered title clickable to redirect to home page
  const isTitleClickable = variant !== "large";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        position: "relative",
        userSelect: "none",
        ...sx,
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: textAlignment,
        }}>
        <Typography
          variant="h1"
          component="h1"
          color="title"
          onClick={() => {
            if (isTitleClickable) {
              router.push("/");
            }
          }}
          sx={{
            fontSize: h1Size,
            textAlign: textAlignment,
            whiteSpace: "nowrap",
            cursor: isTitleClickable ? "pointer" : "auto",
          }}>
          Speed
          <span
            style={{
              color: theme.palette.title.secondary,
            }}>
            Fill
          </span>
        </Typography>
        <Image
          src="/icons/wand.svg"
          width={74}
          height={72}
          alt="Wand"
          draggable="false"
          style={{
            marginLeft: "0.5rem",
            userSelect: "none",
            width: iconSize,
            height: iconSize,
          }}
        />
      </Box>

      <Box
        display="flex"
        justifyContent={textAlignment}
        position="relative"
        sx={{ marginTop: variant == "large" ? "1.4rem" : "1.5rem" }}>
        {variant !== "large" && (
          <Image
            width={30}
            height={30}
            src="/icons/scribbles/grass.svg"
            alt="Scribble"
            draggable="false"
            style={{
              userSelect: "none",
              position: "absolute",
              transform: "translate(-720%, -60%)",
            }}
          />
        )}
        <Typography
          variant="h2"
          component="p"
          color="title"
          sx={{
            fontSize: h2Size,
            textAlign: textAlignment,
            whiteSpace: "nowrap",
          }}>
          {secondaryText}
        </Typography>
        {variant !== "large" && (
          <Image
            width={40}
            height={30}
            src="/icons/scribbles/letter.svg"
            alt="Scribble"
            draggable="false"
            style={{
              userSelect: "none",
              position: "absolute",
              transform: "translate(570%, -30%)",
            }}
          />
        )}
      </Box>

      <Box display="flex" justifyContent={textAlignment} position="relative">
        <Typography
          variant="h3"
          component="p"
          color="title"
          sx={{
            fontSize: h3Size,
            textAlign: textAlignment,
            display: "block",
            overflow: "visible",
            marginTop: "0.4rem",
            whiteSpace: variant === "large" ? "normal" : "nowrap",
            maxWidth: variant === "large" ? "70%" : "auto",
          }}>
          {tertiaryText}
        </Typography>
        {variant !== "large" && (
          <Image
            width={130}
            height={20}
            src="/icons/scribbles/underscore.svg"
            alt="Scribble"
            draggable="false"
            style={{
              userSelect: "none",
              position: "absolute",
              transform: "translate(150%, 160%)",
            }}
          />
        )}
      </Box>

      {variant === "large" && (
        <Image
          width={900}
          height={150}
          src="/icons/scribbles/giant_underscore.svg"
          alt="Scribble"
          draggable="false"
          style={{
            userSelect: "none",
            position: "absolute",
            transform: "translate(-5%, 170%)",
          }}
        />
      )}
    </Box>
  );
};

export default Title;
