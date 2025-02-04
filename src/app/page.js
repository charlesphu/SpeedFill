"use client";

import Background from './components/Background';
import Title from './components/Title';

import { Box } from '@mui/material';

const Home = () => {
  return (
    <>
      <Background imageUrl='/background.png'>
        <Box sx={{
          display: 'flex',
          height: '100vh',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: '40%',
          }}>
            <Title size="120" secondaryText='Seamless Job Applications, Every Time.' teritaryText='Upload your resume and let AI help you get your dream job!' />
          </Box>
          <Box sx={{ width: '50%', alignItems: 'center', }}>
          </Box>
        </Box>
      </Background>
    </>
  );
};

export default Home;
