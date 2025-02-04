// This will be the center large "SpeedFill" title used in most page. Should have an option to display the subtitles or not.
// Some pages may only want to display the title without the subtitles.

import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const Title = ({ secondaryText, teritaryText, size }) => {
    const _fontsize = `${size}px`
    const _secondaryFontsize = `${size / 3}px`
    const _teritaryFontsize = `${size / 5}px`
    const _iconSize = `${size / 1.4}px`
    const _shadowSize = `${size / 5}px`
    const _shadowSize2 = `${size / 2}px`

    const theme = useTheme();

    return (
        <Box sx={{ textAlign: 'center', padding: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                <Typography
                    variant="h1"
                    component="h1"
                    color="title"
                    sx={{
                        textAlign: 'left',
                        fontSize: _fontsize,
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        textShadow: `0px ${_shadowSize} ${_shadowSize2} rgba(0, 0, 0, 0.3)`,
                    }}
                >
                    Speed
                    <span style={{ textShadow: `0px ${_shadowSize} ${_shadowSize2} rgba(0, 0, 0, 0.3)`, color: theme.palette.title2.main }}>Fill</span>
                </Typography>

                <svg
                    fill="none"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    width={_iconSize}
                    height={_iconSize}
                    style={{
                        marginLeft: '10px',
                        width: 'auto',
                    }}
                >
                    <path
                        d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z"
                        clipRule="evenodd"
                        fill={theme.palette.title2.main}
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
                        marginTop: '15px',
                        textAlign: 'left',
                        fontSize: _secondaryFontsize,
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        textShadow: `0px ${_shadowSize} ${_shadowSize2} rgba(0, 0, 0, 0.3)`,
                    }}
                >
                    {secondaryText}
                </Typography>
            )}

            {
                teritaryText && (
                    <Typography
                        variant="h7"
                        component="p"
                        color="title"
                        sx={{
                            textAlign: 'left',
                            fontSize: _teritaryFontsize,
                            fontWeight: '200',
                            textShadow: `0px ${_shadowSize} ${_shadowSize2} rgba(0, 0, 0, 0.3)`,
                        }}
                    >
                        {teritaryText}
                    </Typography>
                )
            }
        </Box >
    );
};

export default Title;