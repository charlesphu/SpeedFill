import { Box, Typography } from "@mui/material";
import { useState } from "react";

import Container from "../components/Container";
import Panel from "../components/Panel";

const ActivityPanel = () => {
  return (
    <Container
      title="Your History"
      subtitle="Review your previously generated cover letters and resume feedbacks"
      sx={{ width: "60rem" }}>
      <Panel></Panel>
    </Container>
  );
};

export default ActivityPanel;
