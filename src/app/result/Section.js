import { Box, Typography } from "@mui/material";
import Panel from "../components/Panel";

// Section component to display a title, subtitle, and content within CoverLetter or ResumeAnalysis
const Section = ({ title, subtitle, icon, children }) => {
  return (
    <Panel
      sx={{
        maxWidth: null,
      }}>
      {/* Section Title */}
      <Box display="flex" flexDirection="row" alignItems="center" gap="0.55rem">
        <Typography variant="h2" color="title">
          {title}
        </Typography>
        {icon && (
          <img
            src={icon}
            alt="icon"
            width={20}
            height={20}
            style={{ marginBottom: "0.1rem" }}
          />
        )}
      </Box>
      <Typography
        variant="subtitle1"
        color="title"
        sx={{
          lineHeight: "1.2rem",
          marginTop: "0.4rem",
        }}>
        {subtitle}
      </Typography>

      {/* Content */}
      {children}
    </Panel>
  );
};

export default Section;
