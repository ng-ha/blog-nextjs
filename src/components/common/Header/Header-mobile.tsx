import { Box, Button, Drawer, List, Stack, Link as MuiLink, Fab, Menu, Icon } from '@mui/material';
import { Container } from '@mui/system';
import Link from 'next/link';
import React, { useState } from 'react';
import { ROUTE_LIST } from './routes';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '@/hooks';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
export function HeaderMobile() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { profile, logout } = useAuth();
  const isLoggedIn = Boolean(profile?.username);
  const routeList = ROUTE_LIST.filter((route) => !route.requireLogin || isLoggedIn);
  return (
    <Box display={{ xs: 'block', md: 'none' }} py={4}>
      <Container>
        <Box display="flex" justifyContent="flex-end">
          <Fab color="secondary" aria-label="add" size="medium" onClick={() => setShow(true)}>
            <MenuIcon sx={{ color: 'white' }} />
          </Fab>
        </Box>
        <Drawer anchor="top" open={show} onClose={() => setShow(false)}>
          <Stack px={4} py={2} bgcolor="secondary.light">
            {routeList.map((route) => (
              <Link key={route.path} href={route.path} passHref legacyBehavior>
                <MuiLink
                  sx={{
                    ml: 2,
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                  className={clsx({ active: router.pathname === route.path })}
                  py={1}
                  onClick={() => setShow(false)}
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
                  py: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
                onClick={() => {
                  logout();
                  setShow(false);
                }}
              >
                <Icon component={LogoutIcon} sx={{ fontSize: 28, color: 'inherit', mr: 0.5 }} />
                Logout
              </MuiLink>
            ) : (
              <Link href="/login" passHref legacyBehavior>
                <MuiLink
                  sx={{
                    ml: 2,
                    fontWeight: 500,
                    py: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                  className={clsx({ active: router.pathname === '/login' })}
                  onClick={() => setShow(false)}
                >
                  <Icon component={LoginIcon} sx={{ fontSize: 28, color: 'inherit', mr: 0.5 }} />
                  Login
                </MuiLink>
              </Link>
            )}
          </Stack>
        </Drawer>
      </Container>
    </Box>
  );
}
