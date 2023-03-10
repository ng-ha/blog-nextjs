import { authApi } from '@/api-client';
import { LoginPayLoad } from '@/models';
import useSWR from 'swr';
import { PublicConfiguration } from 'swr/_internal';

export function useAuth(options?: Partial<PublicConfiguration>) {
  const {
    data: profile,
    error,
    mutate,
    isLoading,
    isValidating,
  } = useSWR('/profile', {
    dedupingInterval: 60 * 60 * 1000, // 1hr
    revalidateOnFocus: false,
    ...options,
  });

  const firstLoading = profile === undefined && error === undefined;

  const login = async (payload: LoginPayLoad) => {
    await authApi.login(payload);
    await mutate();
  };
  const logout = async () => {
    await authApi.logout();
    await mutate({}, { revalidate: false });
    // mutate({}) or mutat(null). Không mutate(undefined)
  };

  return { profile, error, login, logout, isLoading, isValidating, firstLoading };
}
