import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CustomButton = ({
  children,
  variant = "contained",
  color,
  fullWidth = true,
  onClick,
  type = "button",
  sx = {},
}) => {
  const theme = useTheme();

  return (
    <Button
      type={type}
      variant={variant}
      color={color || "primary"}
      fullWidth={fullWidth}
      onClick={onClick}
      disableRipple
      sx={{
        borderRadius: "5px",
        backgroundColor: theme.palette.menu.button,
        fontSize: "20px",
        minHeight: "50px",
        textTransform: "none",
        color: theme.palette.text.main,
        boxShadow: "none",
        border: "none",
        outline: "none",
        "&:hover": {
          backgroundColor: theme.palette.menu.button_hover,
          boxShadow: "none",
          border: "none",
        },
        ...sx,
      }}>
      {children}
    </Button>
  );
};

export default CustomButton;
