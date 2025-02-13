import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useTheme } from "@emotion/react";

import Container from "../components/Container";
import Panel from "../components/Panel";

const ActivityColumns = () => {
  const theme = useTheme();
  return (
    <TableRow
      sx={{
        borderBottom: "2px solid " + theme.palette.primary.main,
        "& > th": { padding: 0, paddingBottom: "0.3rem" },
      }}>
      <TableCell
        min-width="10rem"
        sx={{
          width: "18%",
        }}>
        <Typography variant="body1" color="primary">
          TIME
        </Typography>
      </TableCell>
      <TableCell
        sx={{
          width: "18%",
        }}>
        <Typography variant="body1" color="primary">
          ROLE
        </Typography>
      </TableCell>
      <TableCell
        sx={{
          width: "23%",
        }}>
        <Typography variant="body1" color="primary">
          RESUME
        </Typography>
      </TableCell>
      <TableCell
        sx={{
          width: "13%",
        }}>
        <Typography variant="body1" color="primary">
          TYPE
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="primary">
          CONTENT
        </Typography>
      </TableCell>
    </TableRow>
  );
};

const ActivityRow = ({}) => {
  return (
    <TableRow
      sx={{
        "& > td": {
          borderBottom: 0,
          padding: 0,
          paddingTop: "1rem",
        },
      }}>
      <TableCell>
        <Typography variant="body1" color="text">
          1-26-2005
        </Typography>
        <Typography
          fontSize="0.8rem"
          variant="body1"
          color="text"
          marginTop="-0.3rem">
          1:25 PM
        </Typography>
      </TableCell>

      <TableCell>
        <Typography
          variant="body1"
          color="text"
          maxWidth="5rem"
          sx={{ lineHeight: "1.2" }}>
          Frontend Engineer
        </Typography>
      </TableCell>

      <TableCell>
        <Box display="flex" flexDirection="column">
          <Typography
            fontSize="1.2rem"
            color="title"
            maxWidth="8rem"
            overflow="hidden"
            textOverflow="ellipsis"
            sx={{
              textDecoration: "underline",
            }}>
            long_ass_file.pdf
          </Typography>
          <Typography fontSize="0.8rem" color="title" marginTop="-0.3rem">
            5.55MB
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Typography
          variant="body1"
          color="text"
          maxWidth="5rem"
          sx={{ lineHeight: "1.2" }}>
          Cover Letter
        </Typography>
      </TableCell>

      <TableCell>
        <Box display="flex" flexDirection="column">
          <Typography
            fontSize="1.2rem"
            color="title"
            maxWidth="10rem"
            overflow="hidden"
            textOverflow="ellipsis"
            sx={{
              textDecoration: "underline",
            }}>
            lonnggg_ass_file_name
          </Typography>
          <Typography fontSize="0.8rem" color="title" marginTop="-0.3rem">
            5.55MB
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
};

const ActivityControl = ({}) => {
  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="center"
      alignItems="center"
      gap="1rem">
      <Typography color="primary">
        &lt;{" "}
        <Typography component="span" sx={{ textDecoration: "underline" }}>
          Back
        </Typography>
      </Typography>
      <Typography color="text">1 / 2</Typography>
      <Typography color="primary">
        <Typography component="span" sx={{ textDecoration: "underline" }}>
          Next
        </Typography>{" "}
        &gt;
      </Typography>
    </Box>
  );
};

const ActivityPanel = ({ sx }) => {
  const theme = useTheme();

  const [activites, setActivities] = useState([
    <ActivityRow />,
    <ActivityRow />,
    <ActivityRow />,
    <ActivityRow />,
    <ActivityRow />,
  ]);

  return (
    <Container
      title="Your History"
      subtitle="Review your previously generated cover letters and resume feedbacks"
      sx={{ width: "45rem", maxWidth: "md", ...sx }}>
      <Panel sx={{ maxWidth: "md" }}>
        <Box display="flex" flexDirection="column" gap="0.5rem">
          <TableContainer>
            <Table>
              <TableHead>
                <ActivityColumns />
              </TableHead>

              {/* Table Body */}
              <TableBody>{...activites}</TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Panel>
      <ActivityControl />
    </Container>
  );
};

export default ActivityPanel;
