import { Box, TextField, useTheme } from "@mui/material";
import Container from "../components/Container";
import Panel from "../components/Panel";

const AdditionalDetails = ({ additionalDetails, setAdditionalDetails, sx }) => {
  const theme = useTheme();

  return (
    <Container
      title="Additional Details"
      subtitle="Anything else you'd like us to cover?"
      sx={{ maxWidth: "none", width: "40rem", borderRadius: "20px", ...sx }}>
      <Panel sx={{ border: "none", backgroundColor: "none" }}>
        <Box
          sx={{
            width: "100%",
            height: "82%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}>
          <TextField
            placeholder="Ask questions or add details (like relevant experience) here..."
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            sx={{
              backgroundColor: theme.palette.accent.main,
              color: "white",
              border: "1px solid white",
              borderRadius: "20px",
              height: "35vh",
              width: "1000%",
              "& .MuiOutlinedInput-root": {
                fontSize: "0.8rem",
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "white",
              },
            }}
          />
        </Box>
      </Panel>
    </Container>
  );
};

export default AdditionalDetails;
