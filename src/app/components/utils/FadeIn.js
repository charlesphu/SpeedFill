import React, { useEffect, useState } from 'react';
import { Fade } from '@mui/material';

const FadeIn = ({ children, timeout = 2000 }) => {
    const [fadeIn, setFadeIn] = useState(false);
    useEffect(() => {
        setFadeIn(true);
    }, []);

    return (
        <Fade in={fadeIn} timeout={timeout}>
            <div>{children}</div>
        </Fade>
    );
};

export default FadeIn;
