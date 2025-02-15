import { Divider } from '@mui/material';

const CustomDivider = () => {
    return (
        <Divider sx={{
            fontSize: '1rem',
            width: "70%",
            maxWidth: "500px",
            fontWeight: 'thin',
            color: "white",
            margin: "0 auto",
            '&::before, &::after': {
                borderColor: "white",
            },
            '& span': {
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
            }
        }}>
            OR
        </Divider>
    );
};

export default CustomDivider;
