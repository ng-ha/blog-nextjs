import { useAuth } from '@/hooks';
import { Box, Icon, Link as MuiLink } from '@mui/material';
import { Container, Stack } from '@mui/system';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { ROUTE_LIST } from './routes';

export function HeaderDesktop() {
  const router = useRouter();
  const { profile, logout } = useAuth();
  const isLoggedIn = Boolean(profile?.username);
  const routeList = ROUTE_LIST.filter((route) => !route.requireLogin || isLoggedIn);

  return (
    <Box display={{ xs: 'none', md: 'block' }} py={4}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {routeList.map((route) => (
            <Link key={route.path} href={route.path} passHref legacyBehavior>
              <MuiLink
                sx={{ ml: 2, fontWeight: 500, display: 'flex', alignItems: 'center' }}
                className={clsx({ active: router.pathname === route.path })}
              >
                {route.label}
              </MuiLink>
            </Link>
          ))}
          {isLoggedIn ? (
            <MuiLink
              sx={{
                ml: 2,
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={logout}
            >
              <Icon component={LogoutIcon} sx={{ fontSize: 28, color: 'inherit', mr: 0.5 }} />
              Logout
            </MuiLink>
          ) : (
            <Link href="/login" passHref legacyBehavior>
              <MuiLink
                sx={{ ml: 2, fontWeight: 500, display: 'flex', alignItems: 'center' }}
                className={clsx({ active: router.pathname === '/login' })}
              >
                <Icon component={LoginIcon} sx={{ fontSize: 28, color: 'inherit', mr: 0.5 }} />
                Login
              </MuiLink>
            </Link>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
