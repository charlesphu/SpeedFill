// The background image shared across all pages, not sure if this should be a component or be embedded in the styles
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
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
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
        </Box>
    );
};

export default Background;
