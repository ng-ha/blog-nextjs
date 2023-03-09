import { authApi } from '@/api-client';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';
import React from 'react';

const LoginPage = () => {
  const router = useRouter();
  const { profile, login, logout } = useAuth({ revalidateOnMount: false });

  const handleLogin = async () => {
    try {
      await login();
      router.push('/about');
    } catch (error) {
      console.log('Fail to login: ', error);
    }
  };
  // const handleGetProfile = async () => {
  //   try {
  //     await logout();
  //     console.log('redirect to login page');
  //   } catch (error) {
  //     console.log('Fail to get profile: ', error);
  //   }
  // };
  const handleLogout = async () => {
    try {
      await logout();
      console.log('redirect to login page');
    } catch (error) {
      console.log('Fail to logout: ', error);
    }
  };
  return (
    <div>
      <h1>Login Page</h1>

      <p>Profile: {JSON.stringify(profile || {}, null, 4)}</p>

      <button onClick={handleLogin}>Login</button>
      {/* <button onClick={handleGetProfile}>Get Profile</button> */}
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => router.push('/about')}>Go to about</button>
    </div>
  );
};

export default LoginPage;
