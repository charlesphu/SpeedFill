import { Divider } from "@mui/material";

// This component is a custom divider that can be used in various parts of the application.
const CustomDivider = ({ width, verticalMargin }) => {
  return (
    <Divider
      sx={{
        fontSize: "0.9rem",
        width: width || "100%",
        fontWeight: "thin",
        color: "white",
        margin: "0 auto",
        marginTop: verticalMargin || "0",
        marginBottom: verticalMargin || "0",
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
