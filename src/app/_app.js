import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/muiTheme'; // Path to your custom theme
import CssBaseline from '@mui/material/CssBaseline'; // To apply default MUI styles

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;