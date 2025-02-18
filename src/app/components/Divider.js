import { Divider } from "@mui/material";

const CustomDivider = () => {
  return (
    <Divider
      sx={{
        fontSize: "0.9rem",
        width: "100%",
        fontWeight: "thin",
        color: "white",
        margin: "0 auto",
        "&::before, &::after": {
          borderColor: "white",
        },
        "& span": {
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
        },
      }}>
      OR
    </Divider>
  );
};

export default CustomDivider;
