import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const TextArea = ({ label, type, value, onChange, required = false }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    const theme = useTheme();

    return (
        <TextField
            label={label}
            type={isPassword && !showPassword ? 'password' : 'text'}
            variant="filled"
            fullWidth
            sx={{
                fontSize: '2rem',
                backgroundColor: theme.palette.menu.textarea,
                borderColor: theme.palette.text.main,
                border: `2px solid ${theme.palette.text.secondary}`,
                borderRadius: '10px',
                fontWeight: 'thin',
                marginTop: '.5vw',
                marginBottom: '.5vw',
                input: {
                    color: theme.palette.primary.main,
                },

                '& .MuiInputLabel-root': {
                    color: theme.palette.primary.main,
                    fontSize: '1vw',
                },

                '& .MuiInputLabel-root.Mui-focused': {
                    color: theme.palette.primary.main,
                },

                '& .MuiInputBase-input::placeholder': {
                    color: theme.palette.primary.main,
                    fontSize: '1vw',
                },

                '& .MuiFilledInput-root': {
                    backgroundColor: theme.palette.menu.textarea,
                    borderRadius: '10px',
                    '&:before, &:after': {
                        display: 'none',
                    },
                    '& input:-webkit-autofill': {
                        WebkitBoxShadow: `0 0 0 100px ${theme.palette.menu.textarea} inset !important`,
                        WebkitTextFillColor: `${theme.palette.primary.main} !important`,
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                },
            }}
            margin="normal"
            value={value}
            onChange={onChange}
            required={required}
            slotProps={
                isPassword
                    ? {
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        edge="end"
                                        sx={{
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }
                    : {}
            }
        />
    );
};

export default TextArea;
