import { Box, Typography } from "@mui/material";
import Container from "../components/Container";
import Panel from "../components/Panel";
import ActionButton from "./ActionButton";
import Image from "next/image";

import { getUser } from "../hooks/supabase/auth";
import { useEffect, useState } from "react";

import {
  deleteCurrentResume,
  getCurrentResume,
  openCurrentResume,
} from "../hooks/supabase/uploadfile";

// This component displays the user's account information, including their email address and resume status.
const AccountPanel = ({ sx }) => {
  // State variables to manage user email and resume status
  const [userEmail, setUserEmail] = useState("Loading...");
  const [hasResume, setHasResume] = useState(false);

  // Effect to fetch the user's email address when the component mounts
  useEffect(() => {
    const fetchEmail = async () => {
      const email = await getUser();
      setUserEmail(email || "No user data");
    };

    fetchEmail();
  }, [userEmail]);

  // Effect to check if the user has a resume when the component mounts
  useEffect(() => {
    const checkResume = async () => {
      const hasDefaultResume = await getCurrentResume();
      if (hasDefaultResume) {
        setHasResume(true);
      }
    };

    checkResume();
  }, []);

  return (
    <Container
      title="Your Infomation"
      subtitle="Manage your password and saved resume"
      sx={{ width: "25rem", ...sx }}>
      <Panel>
        {/* Email Field */}
        <Typography variant="h5" color="title">
          Email Address:
        </Typography>
        <Typography
          variant="body1"
          color="title"
          overflow="hidden"
          textOverflow="ellipsis">
          {userEmail}
        </Typography>

        {/* Resume Field */}
        <Typography variant="h5" color="title" sx={{ marginTop: "1rem" }}>
          Resume:
        </Typography>
        {hasResume ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginTop="0.2rem"
            marginBottom="-0.2rem">
            <Box display="flex" alignItems="center">
              <Image src="/icons/File.svg" alt="icon" width={30} height={35} />
              <Box display="flex" flexDirection="column" marginLeft="0.5rem">
                <Typography
                  fontSize="1.2rem"
                  color="title"
                  maxWidth="12rem"
                  overflow="hidden"
                  textOverflow="ellipsis">
                  resume.pdf
                </Typography>
                <Typography fontSize="0.7rem" color="title" marginTop="-0.2rem">
                  5.55MB
                </Typography>
              </Box>
            </Box>
            <Box display="flex" gap="0.8rem">
              <ActionButton
                icon="/icons/Eye.svg"
                onClick={() => openCurrentResume()}
              />
              <ActionButton
                icon="/icons/Trash.svg"
                onClick={() => {
                  setHasResume(false);
                  deleteCurrentResume();
                }}
              />
            </Box>
          </Box>
        ) : (
          <Typography color="text">No File Uploaded</Typography>
        )}
      </Panel>
    </Container>
  );
};

export default AccountPanel;
