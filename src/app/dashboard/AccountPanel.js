import { Box, Typography, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import Container from "../components/Container";
import Panel from "../components/Panel";
import ActionButton from "./ActionButton";
import Image from "next/image";
import { getUser } from "../hooks/supabase/auth";
import {
  deleteCurrentResume,
  getCurrentResume,
  openCurrentResume,
} from "../hooks/supabase/uploadfile";

const AccountPanel = ({ sx }) => {
  const [userEmail, setUserEmail] = useState("Loading...");
  useEffect(() => {
    const fetchEmail = async () => {
      const email = await getUser();
      setUserEmail(email || "No user data");
    };

    fetchEmail();
  }, [userEmail]);

  return (
    <Container
      title="Your Infomation"
      subtitle="Manage your password and saved resume"
      sx={{ width: "25rem", ...sx }}>
      <Panel>
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
        <Typography variant="h5" color="title" sx={{ marginTop: "1rem" }}>
          Resume:
        </Typography>
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
                lonnggg_ass_file_name
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
              onClick={() => deleteCurrentResume()}
            />
          </Box>
        </Box>
      </Panel>
    </Container>
  );
};

export default AccountPanel;
