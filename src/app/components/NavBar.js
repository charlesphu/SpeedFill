// This will be the upper right navigation bar used in every page. Should have responsive flexing that adjust to the size of
// the navbar contents "Home, Dashboard, Logout, etc". The buttons should also be clickable and navigate to the respective routes

import { Typography } from "@mui/material";
import { Box, display } from "@mui/system";
import Image from "next/image";

import { useRouter } from "next/navigation";

const NavBarItem = ({ text, src }) => {
  const router = useRouter();

  return (
    <Typography
      variant="h5"
      color="title"
      zIndex="1"
      sx={{
        textDecoration: "underline",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
      onClick={() => router.push(src)}>
      {text}
    </Typography>
  );
};

const NavBar = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      gap="1rem"
      paddingRight="2rem"
      sx={{ position: "absolute", right: "0", top: "2rem" }}>
      {children}

      {/* <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: "url('/images/Ribbon.svg')",
          backgroundSize: "100% 100%", // Stretches the SVG to fill the container
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          right: "0",
        }}></div> */}
      {/* <img
        src="/images/Ribbon.svg"
        alt="Ribbon"
        style={{
          position: "absolute",
          width: "calc(100% + 3rem)",
          height: "calc(100% + 0.5rem)",
          objectFit: "cover",
          right: "0",
          top: "-15%",
          zIndex: 0,
        }}
      /> */}
    </Box>
  );
};

export { NavBar, NavBarItem };
