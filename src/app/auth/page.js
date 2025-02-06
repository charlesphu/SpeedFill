"use client";

import { Box, useTheme, useMediaQuery } from '@mui/material';
import Background from '../components/Background';
import Title from '../components/Title';
import FadeIn from '../components/utils/FadeIn';
import AuthForm from './authForm';

const Auth = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery('(max-width: 1000px)');

    return (
        <Background imageUrl='/background.jpg'>
            {isSmallScreen ? (
                <Box sx={{
                    display: 'flex',
                    height: '100vh',
                    width: '100vw',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: theme.palette.menu.main,
                }}>
                    <FadeIn timeout={2000}>
                        <AuthForm />
                    </FadeIn>
                </Box>
            ) : (
                <Box sx={{
                    display: 'flex',
                    height: '100vh',
                    minWidth: '800px',
                    minHeight: '600px',
                    position: 'relative',
                    overflow: 'hidden',
                    flexDirection: 'row',
                }}>
                    <Box sx={{
                        width: '60vw',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: '0vw',
                    }}>
                        <FadeIn timeout={1000}>
                            <Title
                                secondaryText="Seamless Job Applications, Every Time."
                                teritaryText="Upload your resume and let AI help you get your dream job!"
                            />
                        </FadeIn>
                    </Box>

                    <Box sx={{
                        width: '40vw',
                        minHeight: '100vh',
                        height: 'auto',
                        backgroundColor: theme.palette.menu.main,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: '1rem',
                    }}>
                        <FadeIn timeout={2000}>
                            <AuthForm />
                        </FadeIn>
                    </Box>
                </Box>
            )}
        </Background>
    );
};

export default Auth;
