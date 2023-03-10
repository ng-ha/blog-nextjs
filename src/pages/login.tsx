import { LoginForm } from '@/components/auth';
import { MainLayout } from '@/components/layout';
import { useAuth } from '@/hooks';
import { LoginPayLoad } from '@/models';
import { Box, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth({ revalidateOnMount: false });

  const handleLoginSubmit = async (payload: LoginPayLoad) => {
    try {
      await login(payload);
      router.push('/');
    } catch (error) {
      console.log('Fail to login: ', error);
    }
  };

  return (
    <Box>
      <Paper elevation={4} sx={{ mt: 8, mx: 'auto', p: 4, maxWidth: '480px', textAlign: 'center' }}>
        <Typography component="h1" variant="h5" fontWeight={700} mb={2}>
          Login
        </Typography>

        <LoginForm onSubmit={handleLoginSubmit} />
      </Paper>
    </Box>
  );
};
LoginPage.Layout = MainLayout;
export default LoginPage;
