"use client";

import Background from './components/Background';

import { useTheme } from '@mui/material';

const Home = () => {
  const theme = useTheme();
  return (
    <Background imageUrl='/background.jpg'>
    </Background >
  );
};

export default Home;
