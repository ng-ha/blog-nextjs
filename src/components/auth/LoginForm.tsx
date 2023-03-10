import { LoginPayLoad } from '@/models';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '../form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface LoginFormProps {
  onSubmit?: (payload: LoginPayLoad) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Please enter your username!')
      .min(4, 'Username is required to have at least 4 characters.'),
    password: yup
      .string()
      .required('Please enter your password!')
      .min(6, 'Password is required to have at least 6 characters.'),
  });

  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginPayLoad>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const handleLoginSubmit = async (payload: LoginPayLoad) => {
    await onSubmit?.(payload);
  };
  return (
    <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
      <InputField label="Username" name="username" control={control} />
      <InputField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        control={control}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((x) => !x)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        disabled={isSubmitting}
        startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null}
        fullWidth
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>
  );
}
