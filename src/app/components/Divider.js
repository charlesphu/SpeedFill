import { Divider } from '@mui/material';

const CustomDivider = () => {
    return (
        <Divider sx={{
            fontSize: '0.7rem',
            width: "50%",
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
