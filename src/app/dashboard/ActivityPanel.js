import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grow,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { getUserHistory } from "../hooks/supabase/getfile";
import { useRouter } from "next/navigation";

import Container from "../components/Container";
import Panel from "../components/Panel";

const MAX_ENTRY_PER_PAGE = 4;

// ActivityPanel component to display user activity history
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
          width: "32%",
        }}>
        <Typography variant="body1" color="primary">
          RESUME
        </Typography>
      </TableCell>
      <TableCell
        sx={{
          width: "20%",
        }}>
        <Typography variant="body1" color="primary">
          TYPE
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="primary">
          RESPONSE
        </Typography>
      </TableCell>
    </TableRow>
  );
};

// ActivityRow component to display individual activity entry
const ActivityRow = ({ index, date, time, role, resume, content, type }) => {
  // Destructure resume and content data
  const [resumeName, resumeSize, resumeSrc] = resume;
  const [contentName, contentSize, _, uniqueID] = content;

  // Determine the route path based on type
  const router = useRouter();
  const routePath =
    type == "Resume Analysis"
      ? "/result?type=resume"
      : "/result?type=coverletter";

  return (
    <Grow
      in={true}
      timeout={500}
      style={{
        transitionDelay: `${index * 40}ms`,
      }}>
      {/* Table Row for each activity entry */}
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
            {date}
          </Typography>
          <Typography
            fontSize="0.8rem"
            variant="body1"
            color="text"
            marginTop="-0.3rem">
            {time}
          </Typography>
        </TableCell>

        {/* Resume Column */}
        <TableCell>
          <Box
            display="flex"
            flexDirection="column"
            sx={{
              userSelect: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              router.push(resumeSrc);
            }}>
            <Typography
              fontSize="1.2rem"
              color="title"
              maxWidth="10rem"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              sx={{
                textDecoration: "underline",
              }}>
              {resumeName}
            </Typography>
            <Typography fontSize="0.8rem" color="title" marginTop="-0.3rem">
              {resumeSize}
            </Typography>
          </Box>
        </TableCell>

        {/* Type Column */}
        <TableCell>
          <Typography
            variant="body1"
            color="text"
            maxWidth="5rem"
            sx={{ lineHeight: "1.2" }}>
            {type}
          </Typography>
        </TableCell>

        {/* Response Column */}
        <TableCell>
          <Box
            display="flex"
            flexDirection="column"
            sx={{
              userSelect: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              router.push(`${routePath}&id=${uniqueID}`);
            }}>
            <Typography
              fontSize="1.2rem"
              color="title"
              maxWidth="10rem"
              overflow="hidden"
              textOverflow="ellipsis"
              sx={{
                textDecoration: "underline",
              }}>
              {contentName}
            </Typography>
            <Typography fontSize="0.8rem" color="title" marginTop="-0.3rem">
              {contentSize}
            </Typography>
          </Box>
        </TableCell>
      </TableRow>
    </Grow>
  );
};

// ActivityControl component for pagination control
const ActivityControl = ({ currentPage, maxPages, nextPage, prevPage }) => {
  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="center"
      alignItems="center"
      gap="1rem">
      <Typography
        color="primary"
        sx={{
          userSelect: "none",
          cursor: currentPage === 1 ? "hand" : "pointer",
          opacity: currentPage === 1 ? 0.5 : 1,

          transition: "transform 0.1s ease",
          "&:active": {
            transform: currentPage === 1 ? "" : "translate(0, 10%)",
          },
        }}
        onClick={prevPage}>
        &lt; Back
      </Typography>
      <Typography color="text">{`${currentPage} / ${maxPages}`}</Typography>
      <Typography
        color="primary"
        sx={{
          userSelect: "none",
          cursor: currentPage === maxPages ? "hand" : "pointer",
          opacity: currentPage === maxPages ? 0.5 : 1,

          transition: "transform 0.1s ease",
          "&:active": {
            transform: currentPage === maxPages ? "" : "translate(0, 10%)",
          },
        }}
        onClick={nextPage}>
        Next &gt;
      </Typography>
    </Box>
  );
};

const ActivityPanel = ({ sx }) => {
  // State management for activity panel
  const [userHistory, setUserHistory] = useState([]);

  const [userActivities, setUserActivities] = useState([]);
  const [activityElements, setActivityElements] = useState([]);

  const [maxPages, setMaxPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch user history from server
  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserHistory();
      setUserHistory(response);
    };

    fetchData();
  }, []);

  // Process user history into separate pages
  useEffect(() => {
    const activites = [];
    let uniqueNum = userHistory.length + 1;

    // Iterate through user history and create entries
    for (let i = 0; i < userHistory.length; i += MAX_ENTRY_PER_PAGE) {
      const activityPage = [];

      for (const entry of userHistory.slice(i, i + MAX_ENTRY_PER_PAGE)) {
        const entryDate = new Date(entry.time);
        uniqueNum -= 1;

        activityPage.push({
          type: entry.type,

          // Format timestamp
          date: `${
            entryDate.getMonth() + 1
          }-${entryDate.getDate()}-${entryDate.getFullYear()}`,

          time: `${entryDate.getHours() % 12 || 12}:${entryDate.getMinutes()} ${
            entryDate.getHours() >= 12 ? "PM" : "AM"
          }`,

          // Extract file name and size
          resume: {
            name: entry.filepath.split("Z-")[1],
            size: "1.2MB",
            src: entry.resumeFileSrc.publicUrl,
          },

          content: {
            name: `response${uniqueNum}.txt`,
            size: entry.responseSize,
            src: entry.responseURL,
            uniqueID: entry.uniqueID,
          },
        });
      }

      activites.push(activityPage);
    }

    setUserActivities(activites);
    setMaxPages(activites.length);
  }, [userHistory]);

  // Update activity elements based on current page
  useEffect(() => {
    const activityPage = userActivities[currentPage - 1];
    const activityElements =
      activityPage?.map((activity, index) => (
        <ActivityRow
          key={Math.random()}
          index={index}
          date={activity.date}
          time={activity.time}
          resume={[
            activity.resume.name,
            activity.resume.size,
            activity.resume.src,
          ]}
          content={[
            activity.content.name,
            activity.content.size,
            activity.content.src,
            activity.content.uniqueID,
          ]}
          type={activity.type}
        />
      )) || [];

    setActivityElements(activityElements);
  }, [currentPage, userActivities]);

  // State management for pagination
  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container
      title="Your History"
      subtitle="Review your previously generated cover letters and resume feedbacks"
      sx={{ width: "40rem", maxWidth: "md", ...sx }}>
      <Panel sx={{ maxWidth: "md" }}>
        <Box
          display="flex"
          flexDirection="column"
          gap="0.5rem"
          sx={{
            minHeight: "17rem",
          }}>
          <TableContainer>
            <Table>
              <TableHead>
                <ActivityColumns />
              </TableHead>

              {/* Table Body */}
              <TableBody>{...activityElements}</TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Panel>

      {/* Pagination Control */}
      {maxPages > 1 && (
        <ActivityControl
          currentPage={currentPage}
          maxPages={maxPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
    </Container>
  );
};

export default ActivityPanel;
