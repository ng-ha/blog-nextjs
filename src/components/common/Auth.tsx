import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';

export function Auth({ children }: { children: ReactNode }) {
  const { profile, login, logout, error, firstLoading, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!firstLoading && !profile?.username) router.push('/login');
    //  === nếu fetch xong mà có error
  }, [router, profile, firstLoading]);
  if (!profile?.username) return <h1>Loading...</h1>;

  return <div>{children}</div>;
}
