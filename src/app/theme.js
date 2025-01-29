"use client";

import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(97, 34, 255)",
    },
    secondary: {
      main: "rgb(110, 83, 179)",
    },
    link: {
      main: "#858585",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'radial-gradient(circle, rgb(47, 47, 47) 0%, rgb(32, 32, 32) 40%, rgb(12, 12, 12) 80%, rgb(0, 0, 0) 100%)',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;