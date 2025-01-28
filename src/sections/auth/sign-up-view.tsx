import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';
import { Navigate, Link as LinkRouter } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from 'src/firebase/auth';
import { Iconify } from 'src/components/iconify';

export function SignUpView() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = useCallback(async (data: { email: string, password: string }) => {
        try {
            setSubmitError(null);
            await doCreateUserWithEmailAndPassword(data.email, data.password);
            router.push('/');
        } catch (error) {
            console.error('Sign in error:', error);
            setSubmitError(error.message || 'Registeration failed');
        }
    }, [router]);

    const renderForm = (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            placeholder='abc@xyz.com'
                            fullWidth
                            label="Email address"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            sx={{ mb: 3 }}
                        />
                    )}
                />

                

                <Controller
                    name="password"
                    control={control}
                    rules={{ required: 'Password is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Password"
                            placeholder='password'
                            type={showPassword ? 'text' : 'password'}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            <Iconify
                                                icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            sx={{ mb: 3 }}
                        />
                    )}
                />

                {submitError && (
                    <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                        {submitError}
                    </Typography>
                )}

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    color="inherit"
                    variant="contained"
                    loading={isSubmitting}
                >
                    Sign Up
                </LoadingButton>
            </Box>
        </form>
    );

    return (
        <>
            <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
                <Typography variant="h5">Sign up</Typography>
                <Typography display="flex" variant="body2" color="text.secondary">
                    Already have an account?
                    <LinkRouter to="/sign-in" >
                        <Typography variant='body2'>Sign in</Typography>
                    </LinkRouter>
                </Typography>
            </Box>

            {renderForm}
        </>
    );
}