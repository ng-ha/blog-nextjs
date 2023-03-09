import { Box } from '@mui/material';
import React from 'react';
import { HeaderDesktop } from './Header-desktop';
import { HeaderMobile } from './Header-mobile';

export function Header() {
  return (
    <>
      <HeaderMobile />
      <HeaderDesktop />
    </>
  );
}
