import React from 'react';
import { Box, useTheme } from '@mui/material';

const Background = ({ imageUrl, children }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                backgroundColor: theme.palette.primary.main,
                backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                backgroundSize: '200% auto',
                backgroundPosition: '0 0',
                backgroundRepeat: 'repeat-x',
                display: 'flex',
                alignItems: 'center',
                animation: 'scrollBackground 120s linear infinite',
            }}
        >
            {imageUrl && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: theme.palette.background.default,
                        zIndex: 1,
                        opacity: 0.7,
                    }}
                />
            )}
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                {children}
            </Box>
            <style>
                {`
                    @keyframes scrollBackground {
                        0% {
                            background-position: 0 0;
                        }
                        100% {
                            background-position: 200% 0;
                        }
                    }
                `}
            </style>
        </Box>
    );
};

export default Background;
