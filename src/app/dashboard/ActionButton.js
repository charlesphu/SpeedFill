import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import Image from "next/image";

const ActionButton = ({ icon, onClick }) => {
  const theme = useTheme();
  return (
    <Button
      disableRipple
      onClick={onClick}
      sx={{
        height: "2rem",
        width: "2rem",
        minWidth: "2rem",
        minHeight: "2rem",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: theme.palette.action.main,
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },

        transition: "transform 0.1s ease-in-out",
        "&:active": {
          transform: "scale(0.8)",
        },
      }}>
      <Image src={icon} alt="icon" width={18} height={18} draggable={false} />
    </Button>
  );
};
export default ActionButton;
