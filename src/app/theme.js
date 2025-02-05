"use client";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        text: {
            main: '#edefdc',
            secondary: '#bac7b3',
            google_text: '#4a4a4a',
        },
        background: {
            default: '#1A1C0F',
        },
        primary: {
            main: '#d1d7a7',
        },
        secondary: {
            main: '#3e7a38',
        },
        accent: {
            main: '#53b26c',
        },
        title: {
            main: '#EDEFDE',
            secondary: '#D2D7AC'
        },
        menu: {
            main: '#4D7940',
            textarea: '#598F54',
            button: '#4B8C3A',
            button_hover: '#73b562',
            google_hover: '#e3e3e3',
            google_border: '#8a8a8a',
        },
    },
});

export default theme;