import { Box, Typography, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import Container from "../components/Container";
import Panel from "../components/Panel";
import ActionButton from "./ActionButton";
import Image from "next/image";

const AccountPanel = ({ sx }) => {
  // State management for password field
  const [isShowingPassword, setShowPassword] = useState(false);
  const [isEditingPassword, setEditPassword] = useState(false);

  const [password, setPassword] = useState("your_very_long_password");
  const [shownPassword, setShownPassword] = useState("");

  const passwordFieldRef = useRef();

  useEffect(() => {
    if (isShowingPassword) {
      setShownPassword(password);
    } else {
      setShownPassword(password.replace(/./g, "•"));
    }
  }, [isShowingPassword, password]);

  const captureEditPassword = () => {
    passwordFieldRef.current.focus();
    setShowPassword(true);
    setEditPassword(true);
  };

  const releaseEditPassword = () => {
    console.log("Updating password to", passwordFieldRef.current.value);
    setEditPassword(false);
    setShowPassword(false);
  };

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
            <TextField
              inputRef={passwordFieldRef}
              variant="standard"
              value={shownPassword}
              onChange={(e) => {
                if (isEditingPassword) setPassword(e.target.value);
              }}
              onBlur={releaseEditPassword}
              sx={{
                maxWidth: "16rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "1rem",

                "& .MuiInputBase-root": {
                  color: "text.main",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: isEditingPassword
                    ? "text.main"
                    : "transparent",
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: isEditingPassword
                    ? "accent.main"
                    : "transparent",
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: isEditingPassword
                    ? "accent.main"
                    : "transparent",
                },
              }}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </Box>
          <Box display="flex" gap="0.8rem" marginBottom="-0.8rem">
            <ActionButton
              icon={
                isShowingPassword ? "/icons/Striked_Eye.svg" : "/icons/Eye.svg"
              }
              onClick={() => setShowPassword(!isShowingPassword)}
            />
            <ActionButton
              icon="/icons/Edit.svg"
              onClick={captureEditPassword}
            />
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
