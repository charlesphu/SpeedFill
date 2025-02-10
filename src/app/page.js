"use client";

import Background from './components/Background';
import { useTheme } from '@mui/material';
import { Box, Typography, Button } from '@mui/material'
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useState, useEffect } from "react";

const Home = () => {
  const theme = useTheme();

  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <Background imageUrl='/background.jpg'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slight dark background for readability
            padding: '20px',
            borderRadius: '10px',
            width: '80%',
            maxWidth: '400px',
          }}
        >
          {user ? (
            <>
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.text.main,
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                }}
              >
                Welcome, {user.displayName || 'User'}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  marginTop: '10px',
                }}
              >
                Email: {user.email}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  marginTop: '20px',
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.main,
              }}
            >
              You are not logged in. Please sign in to continue.
            </Typography>
          )}
        </Box>
      </Box>
    </Background>
  );
};

export default Home;
