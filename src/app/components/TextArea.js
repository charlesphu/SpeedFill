import { TextField, IconButton, InputAdornment, useTheme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import React, { useState } from "react";

// Enhanced text input component with theming and password visibility toggle
const TextArea = ({ label, type, value, onChange, required = false, sx }) => {
  const theme = useTheme();

  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  // Handle toggle for password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      label={label}
      type={isPassword && !showPassword ? "password" : "text"}
      variant="filled"
      fullWidth
      value={value}
      onChange={onChange}
      required={required}
      InputProps={
        isPassword
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {}
      }
      sx={{
        fontSize: "10rem",
        fontWeight: "thin",
        backgroundColor: theme.palette.menu.textarea,
        borderColor: theme.palette.text.main,
        border: `2px solid ${theme.palette.text.secondary}`,
        borderRadius: "5px",
        marginTop: "0rem",
        marginBottom: "0.8rem",
        input: {
          color: theme.palette.primary.main,
        },
        "& .MuiInputLabel-root": {
          color: theme.palette.primary.main,
        },
        "& .MuiInputLabel-root > .MuiInputLabel-asterisk": {
          display: "none",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: theme.palette.primary.main,
        },
        "& .MuiInputBase-input::placeholder": {
          color: theme.palette.primary.main,
        },
        "& .MuiFilledInput-root": {
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&.Mui-focused": {
            backgroundColor: "transparent",
          },
        },

        ...sx,
      }}
    />
  );
};

export default TextArea;
