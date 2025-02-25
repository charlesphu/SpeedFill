// This will be the upper right navigation bar used in every page. Should have responsive flexing that adjust to the size of
// the navbar contents "Home, Dashboard, Logout, etc". The buttons should also be clickable and navigate to the respective routes

import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/navigation";

const NavBarItem = ({ text, src, onClick }) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Typography
      variant="h3"
      color="title"
      zIndex="1"
      sx={{
        textDecoration: "underline",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        // "&:hover": {
        //   transform: "scale(1.05)",
        // },
      }}
      onClick={() => {
        if (onClick) {
          onClick();
        }
        router.push(src);
      }}>
      {text}
    </Typography>
  );
};

const NavBar = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="row"
      gap="1rem"
      paddingRight="2rem"
      sx={{
        height: "1.5rem",
        position: "absolute",
        right: "0",
        top: "2rem",
        backgroundColor: theme.palette.menu.main,
        padding: "1rem",
      }}>
      <img
        src="/icons/ribbon.svg"
        alt="Ribbon"
        style={{
          height: "2rem",
          width: "2rem",
          position: "absolute",
          left: "-1.2rem",
          top: "0rem",
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}>
        {children}
      </Box>
    </Box>
  );
};

export { NavBar, NavBarItem };
