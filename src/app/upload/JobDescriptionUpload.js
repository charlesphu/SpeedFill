import { Box, TextField, useTheme } from "@mui/material";
import Divider from "../components/Divider";
import Container from "../components/Container";

const JobDescriptionUpload = ({
  jobDescriptionData,
  setJobDescriptionData,
  sx,
}) => {
  const theme = useTheme();

  return (
    <Container
      title="Job Description"
      subtitle="Tell us a little about the job you're applying for"
      sx={{ ...sx }}>
      <Box
        sx={{
          width: "100%",
          height: "20%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}>
        <TextField
          placeholder="Paste the job application URL here..."
          fullWidth
          variant="outlined"
          value={jobDescriptionData.url}
          onChange={(e) =>
            setJobDescriptionData({
              ...jobDescriptionData,
              url: e.target.value,
            })
          }
          sx={{
            backgroundColor: theme.palette.accent.main,
            color: "white",
            border: "1px solid white",
            borderRadius: "5px",
            justifyContent: "center",
            height: "4rem",
            width: "100%",
            "& .MuiOutlinedInput-root": {
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

      <Box
        sx={{
          width: "100%",
          height: "10%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Divider width="60%" verticalMargin="-0.3rem" />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <TextField
          placeholder="Or paste the job description here..."
          multiline
          rows={6}
          fullWidth
          variant="outlined"
          value={jobDescriptionData.text}
          onChange={(e) =>
            setJobDescriptionData({
              ...jobDescriptionData,
              text: e.target.value,
            })
          }
          sx={{
            backgroundColor: theme.palette.accent.main,
            color: "white",
            border: "1px solid white",
            borderRadius: "5px",
            height: "23vh",
            "& .MuiOutlinedInput-root": {
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
    </Container>
  );
};

export default JobDescriptionUpload;
