import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const Title = ({ secondaryText, teritaryText }) => {
    const theme = useTheme();

    const fontSize = '5.5vw';
    const secondaryFontSize = '1.8vw';
    const teritaryFontSize = '1.4vw';
    const iconSize = '4vw';
    const shadowSize = '0.7vw';
    const shadowSize2 = '1.5vw';

    return (
        <Box sx={{ textAlign: 'center', padding: '1vw', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', minWidth: 'fit-content' }}>
                <Typography
                    variant="h1"
                    component="h1"
                    color="title"
                    sx={{
                        textAlign: 'left',
                        fontSize: fontSize,
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        textShadow: `0px ${shadowSize} ${shadowSize2} rgba(0, 0, 0, 0.3)`,
                    }}
                >
                    Speed
                    <span style={{ textShadow: `0px ${shadowSize} ${shadowSize2} rgba(0, 0, 0, 0.3)`, color: theme.palette.title.secondary }}>Fill</span>
                </Typography>

                <svg
                    fill="none"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    width={iconSize}
                    height={iconSize}
                    style={{
                        marginLeft: '0.4vw',
                    }}
                >

                    <path
                        d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z"
                        clipRule="evenodd"
                        fill={theme.palette.title.secondary}
                        fillRule="evenodd"
                    />
                </svg>
            </Box>

            {secondaryText && (
                <Typography
                    variant="h6"
                    component="p"
                    color="title"
                    sx={{
                        marginTop: '1vw',
                        textAlign: 'left',
                        fontSize: secondaryFontSize,
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        textShadow: `0px ${shadowSize} ${shadowSize2} rgba(0, 0, 0, 0.3)`,
                    }}
                >
                    {secondaryText}
                </Typography>
            )}

            {teritaryText && (
                <Typography
                    variant="h7"
                    component="p"
                    color="title"
                    sx={{
                        textAlign: 'left',
                        fontSize: teritaryFontSize,
                        fontWeight: '200',
                        whiteSpace: 'nowrap',
                        overflow: 'visible',
                        minWidth: 'fit-content',
                        display: 'block',
                        maxWidth: '100%'
                    }}
                >
                    {teritaryText}
                </Typography>
            )}
        </Box>
    );
};

export default Title;
