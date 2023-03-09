import { useAuth } from '@/hooks';
import { LayoutProps } from '@/models';

import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Auth } from '../common';

export function AdminLayout({ children }: LayoutProps) {
  const { profile, logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.log('Fail to logout: ', error);
    }
  };
  return (
    <Auth>
      <h1>Admin Layout</h1>
      <div>Sidebar</div>
      <p>Profile: {JSON.stringify(profile)}</p>
      <button onClick={handleLogout}>Logout</button>

      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <div>{children}</div>
    </Auth>
  );
}
