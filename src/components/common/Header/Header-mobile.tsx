import { Box, Button, Drawer, List, Stack, Link as MuiLink, Fab, Menu } from '@mui/material';
import { Container } from '@mui/system';
import Link from 'next/link';
import React, { useState } from 'react';
import { ROUTE_LIST } from './routes';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '@/hooks';
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
          <Stack textAlign="end" px={4} py={2} bgcolor="secondary.light">
            {routeList.map((route) => (
              <Link key={route.path} href={route.path} passHref legacyBehavior>
                <MuiLink
                  sx={{ ml: 2, fontWeight: 500 }}
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
                sx={{ ml: 2, fontWeight: 500, cursor: 'pointer', py: 1 }}
                onClick={() => {
                  logout();
                  setShow(false);
                }}
              >
                Logout
              </MuiLink>
            ) : (
              <Link href="/login" passHref legacyBehavior>
                <MuiLink
                  sx={{ ml: 2, fontWeight: 500, py: 1 }}
                  className={clsx({ active: router.pathname === '/login' })}
                  onClick={() => setShow(false)}
                >
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
