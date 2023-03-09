import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Box, Icon, Stack, Typography } from '@mui/material';
import React from 'react';

export function Footer() {
  const socialLink = [
    { icon: Facebook, url: 'https://google.com' },
    { icon: Instagram, url: 'https://google.com' },
    { icon: Twitter, url: 'https://google.com' },
    { icon: LinkedIn, url: 'https://google.com' },
  ];
  return (
    <Box component="footer" py={2} textAlign="center">
      <Stack direction="row" justifyContent="center">
        {socialLink.map((item, index) => (
          <Box
            key={index}
            component="a"
            p={2}
            href={item.url}
            target="_blank"
            rel="noopener norefferer"
          >
            <Icon component={item.icon} sx={{ fontSize: 42, color: 'text.primary' }} />
          </Box>
        ))}
      </Stack>
      <Typography marginBottom={3}>
        Copyright ©{new Date().getFullYear()} All rights reserved
      </Typography>
    </Box>
  );
}
