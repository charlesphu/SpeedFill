import React, { useState } from 'react';
import { Box, Typography, useTheme, Fade } from '@mui/material';

import TextArea from '../components/TextArea';
import CustomButton from '../components/Button';
import CustomDivider from '../components/Divider';

import { auth } from "../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { useRouter } from 'next/navigation'

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fade, setFade] = useState(true);
    const [error, setError] = useState('');

    const theme = useTheme();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            router.push("/")

        }
        catch (error) {
            setError(`${isLogin ? 'Login' : 'Signup'} failed. Email: ${email} - Error: ${error.message}`);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error.message);
        }
        router.push("/")
    };


    const handleToggleAuth = () => {
        setFade(false);
        setTimeout(() => {
            setIsLogin((prev) => !prev);
            setFade(true);
        }, 300);
    };


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box
                sx={{
                    width: '50%',
                    maxWidth: '400px',
                    minWidth: '400px',
                    padding: '20px',
                    borderRadius: '8px',
                }}
            >
                {error && (
                    <Box sx={{
                        position: 'absolute',
                        top: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        zIndex: 10,
                        fontSize: '14px',
                    }}>
                        <Typography>{error}</Typography>
                    </Box>
                )}
                <Fade in={fade} timeout={500}>
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'left',
                            color: theme.palette.text.main,
                            fontWeight: 'bold',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        {isLogin ? 'Welcome Back' : 'Sign Up'}
                    </Typography>
                </Fade>

                <Fade in={fade} timeout={500}>
                    <Typography
                        variant="h7"
                        sx={{
                            textAlign: 'left',
                            marginBottom: '20px',
                            color: theme.palette.text.main,
                            fontWeight: 'thin',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        {isLogin ? 'Enter your details to continue' : 'Tell us about yourself'}
                    </Typography>
                </Fade>

                <Fade in={fade} timeout={500}>
                    <Box position="relative">
                        <form onSubmit={handleSubmit}>
                            <TextArea
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <TextArea
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {isLogin && (
                                <Box sx={{ width: '100%', textAlign: 'right' }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '12px',
                                            '& a': {
                                                color: theme.palette.text.main,
                                                textDecoration: 'none',
                                                '&:hover': {
                                                    textDecoration: 'underline',
                                                },
                                            },
                                        }}
                                    >
                                        <a href="/forgot-password">Forgot Password?</a>
                                    </Typography>
                                </Box>
                            )}
                            <CustomButton variant="outlined" type="submit" sx={{ fontWeight: 'bold' }}>
                                {isLogin ? 'Sign In' : 'Sign Up'}
                            </CustomButton>
                            <CustomDivider />
                            <CustomButton
                                variant="outlined"
                                onClick={handleGoogleSignIn}
                                sx={{
                                    borderRadius: '20px',
                                    fontWeight: '400',
                                    backgroundColor: 'white',
                                    fontSize: "14px",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    color: theme.palette.text.google_text,
                                    border: `1px solid ${theme.palette.text.google_border}`,
                                    '&:hover': {
                                        backgroundColor: theme.palette.menu.google_hover,
                                    },
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 48 48"
                                    width="1.5rem"
                                    height="1.5rem"
                                >
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                                </svg>
                                Sign in with Google
                            </CustomButton>
                        </form>
                    </Box>
                </Fade>

                <Box position="relative" marginTop="5px">
                    <Typography
                        variant="body2"
                        align="center"
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: 'normal',
                            cursor: 'pointer',
                            '& span': {
                                fontWeight: 'bold',
                                textDecoration: 'underline',
                            },
                        }}
                        onClick={handleToggleAuth}
                    >
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span>{isLogin ? 'Sign Up' : 'Login'}</span>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AuthForm;
