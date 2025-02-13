import { Box, Typography } from "@mui/material";
import { useState } from "react";

import Container from "../components/Container";
import Panel from "../components/Panel";
import ActionButton from "./ActionButton";
import Image from "next/image";

const AccountPanel = () => {
  const [isShowingPassword, setShowPassword] = useState(false);
  const [isEditingPassword, setEditPassword] = useState(false);

  return (
    <Container
      title="Your Infomation"
      subtitle="Manage your password and saved resume"
      sx={{ marginTop: "3rem", width: "25rem" }}>
      <Panel>
        <Typography variant="h5" color="title">
          Email Address:
        </Typography>
        <Typography
          variant="body1"
          color="title"
          overflow="hidden"
          textOverflow="ellipsis">
          email@domain.com
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginTop="0.8rem"
          marginBottom="-0.2rem">
          <Box>
            <Typography variant="h5" color="title">
              Password:
            </Typography>
            <Typography
              variant="body1"
              color="title"
              overflow="hidden"
              textOverflow="ellipsis"
              maxWidth="16rem">
              {isShowingPassword
                ? "your_very_long_password"
                : "•••••••••••••••"}
            </Typography>
          </Box>
          <Box display="flex" gap="0.8rem" marginBottom="-0.8rem">
            <ActionButton
              icon={
                isShowingPassword ? "/icons/Striked_Eye.svg" : "/icons/Eye.svg"
              }
              onClick={() => setShowPassword(!isShowingPassword)}
            />
            <ActionButton icon="/icons/Edit.svg" />
          </Box>
        </Box>
      </Panel>

      <Panel>
        <Typography variant="h5" color="title">
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
            <ActionButton icon="/icons/Eye.svg" />
            <ActionButton icon="/icons/Trash.svg" />
          </Box>
        </Box>
      </Panel>
    </Container>
  );
};

export default AccountPanel;
