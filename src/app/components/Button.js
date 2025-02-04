// This will be our custom generic button Component. Should display a text with an optional icon.
// Reference: "Generate Cover letter" Button
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ComponentButton = ({ text, normalColor, hoverColor, clickColor }) => {
    const theme = useTheme();
    return (
        <Button
            sx={{
                backgroundColor: normalColor,
                color: theme.palette.text.primary,
                '&:hover': {
                    backgroundColor: hoverColor,
                },
                '&:active': {
                    backgroundColor: clickColor,
                },
                transition: 'background-color 0.3s ease',
                padding: '10px 20px',
                fontWeight: 'bold',
            }}
        >
            {text}
        </Button>
    );
};

export default ComponentButton;