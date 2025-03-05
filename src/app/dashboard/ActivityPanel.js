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
  Button,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { getUserHistory } from "../hooks/supabase/getfile";
import { useRouter } from "next/navigation";

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
          RESPONSE
        </Typography>
      </TableCell>
    </TableRow>
  );
};

const ActivityRow = ({ index, date, time, role, resume, content, type }) => {
  const [resumeName, resumeSize, resumeSrc] = resume;
  const [contentName, contentSize, contentSrc] = content;

  const router = useRouter();

  return (
    <Grow
      in={true}
      timeout={500}
      style={{
        transitionDelay: `${index * 40}ms`,
      }}>
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

        <TableCell>
          <Typography
            variant="body1"
            color="text"
            maxWidth="5rem"
            sx={{ lineHeight: "1.2" }}>
            {role}
          </Typography>
        </TableCell>

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
              maxWidth="8rem"
              overflow="hidden"
              textOverflow="ellipsis"
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

        <TableCell>
          <Typography
            variant="body1"
            color="text"
            maxWidth="5rem"
            sx={{ lineHeight: "1.2" }}>
            {type}
          </Typography>
        </TableCell>

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
  const [jsdooodooo, setJS] = useState(0);
  // const TEST_USER_HISTORY = [
  //   {
  //     timestamp: new Date("1-26-2017 3:22 PM"),
  //     role: "Backend Developer",
  //     type: "Resume Analysis",
  //     resume: "resume_final.pdf",
  //     content: "final_version_name.pdf",
  //   },
  //   {
  //     timestamp: new Date("6-15-2020 8:12 AM"),
  //     role: "Full Stack Developer",
  //     type: "Cover Letter",
  //     resume: "portfolio.pdf",
  //     content: "project_abc.pdf",
  //   },
  //   {
  //     timestamp: new Date("12-5-2018 11:45 PM"),
  //     role: "Frontend Engineer",
  //     type: "Resume Analysis",
  //     resume: "long_ass_file.pdf",
  //     content: "portfolio_v1.pdf",
  //   },
  //   {
  //     timestamp: new Date("2-21-2019 10:30 AM"),
  //     role: "UI/UX Designer",
  //     type: "Cover Letter",
  //     resume: "portfolio.pdf",
  //     content: "final_version_name.pdf",
  //   },
  //   {
  //     timestamp: new Date("7-9-2015 9:00 AM"),
  //     role: "Frontend Engineer",
  //     type: "Cover Letter",
  //     resume: "long_ass_file.pdf",
  //     content: "lonnggg_ass_file_name.pdf",
  //   },
  //   {
  //     timestamp: new Date("10-13-2021 5:10 PM"),
  //     role: "Backend Developer",
  //     type: "Resume Analysis",
  //     resume: "long_ass_file.pdf",
  //     content: "lonnggg_ass_file_name.pdf",
  //   },
  //   {
  //     timestamp: new Date("3-11-2016 6:25 AM"),
  //     role: "UI/UX Designer",
  //     type: "Cover Letter",
  //     resume: "resume_final.pdf",
  //     content: "final_version_name.pdf",
  //   },
  //   {
  //     timestamp: new Date("4-22-2014 2:50 PM"),
  //     role: "Full Stack Developer",
  //     type: "Resume Analysis",
  //     resume: "long_ass_file.pdf",
  //     content: "lonnggg_ass_file_name.pdf",
  //   },
  //   {
  //     timestamp: new Date("9-10-2019 7:05 PM"),
  //     role: "Frontend Engineer",
  //     type: "Cover Letter",
  //     resume: "resume_final.pdf",
  //     content: "portfolio_v1.pdf",
  //   },
  //   {
  //     timestamp: new Date("5-30-2022 1:20 AM"),
  //     role: "Backend Developer",
  //     type: "Resume Analysis",
  //     resume: "long_ass_file.pdf",
  //     content: "project_abc.pdf",
  //   },
  // ];
  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserHistory();
      setUserHistory(response);
      // console.log(response);
    };
    fetchData();
    setJS(jsdooodooo + 1);
  }, []);
  const MAX_ENTRY_PER_PAGE = 4;

  const [userActivities, setUserActivities] = useState([]);
  const [activityElements, setActivityElements] = useState([]);

  const [maxPages, setMaxPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Effect runs when myVariable changes
    // console.log("myVariable changed:", userHistory);
    setJS(jsdooodooo + 1);
  }, [userHistory]); // Ensure the dependency array is consistent

  // Process user history into separate pages
  useEffect(() => {
    console.log("called", userHistory, jsdooodooo);
    const activites = [];

    for (let i = 0; i < userHistory.length; i += MAX_ENTRY_PER_PAGE) {
      const activityPage = [];

      for (const entry of userHistory.slice(i, i + MAX_ENTRY_PER_PAGE)) {
        const entryDate = new Date(entry.time);

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
            name: "Response.txt",
            size: entry.responseSize,
            src: entry.responseURL,
          },
        });
      }

      activites.push(activityPage);
    }

    setUserActivities(activites);
    setMaxPages(activites.length);
  }, [jsdooodooo]);

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
          role={activity.role ?? "N/A"}
          resume={[
            activity.resume.name,
            activity.resume.size,
            activity.resume.src,
          ]}
          content={[
            activity.content.name,
            activity.content.size,
            activity.content.src,
          ]}
          type={activity.type}
        />
      )) || [];

    setActivityElements(activityElements);
  }, [currentPage, userActivities]);

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
      sx={{ width: "45rem", maxWidth: "md", ...sx }}>
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
