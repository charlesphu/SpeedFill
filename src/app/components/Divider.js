import { Divider, useTheme } from '@mui/material';

const CustomDivider = () => {
    const theme = useTheme();

    return (
        <Divider sx={{
            fontSize: '0.75rem',
            marginTop: '15px',
            marginBottom: '0px',
            fontWeight: 'thin',
            color: theme.palette.primary.main,
            '&::before, &::after': {
                borderTopWidth: '2px',
                borderColor: theme.palette.primary.main,
            },
            '& span': {
                color: theme.palette.primary.main,
            }
        }}>
            OR
        </Divider>
    );
};

export default CustomDivider;
