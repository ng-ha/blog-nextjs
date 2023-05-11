import { Box, Button, Typography } from '@mui/material';
import { Stack, Container } from '@mui/system';
import Image from 'next/image';
import * as React from 'react';
import avatar from '@/images/avatar.png';
import Link from 'next/link';

export function HeroSection() {
  return (
    <Box component="section" pt={{ xs: 4, md: 6 }} pb={{ xs: 7, md: 9 }}>
      <Container>
        <Stack
          spacing={{ xs: 5, md: 13 }}
          direction={{ xs: 'column-reverse', md: 'row' }}
          alignItems={{ xs: 'center', md: 'flex-start' }}
          textAlign={{ xs: 'center', md: 'left' }}
        >
          <Box>
            <Typography
              component="h1"
              variant="h3"
              fontWeight="700"
              marginBottom={{ xs: 2.5, md: 5 }}
            >
              Hi, I am Nguyen Ha, <br />
              An explorer
            </Typography>
            <Typography variant="body1" marginBottom={{ xs: 2.5, md: 5 }}>
              A passionate web & mobile developer from Viet Nam
            </Typography>
            <Link href="https://portfolio-ng-ha.vercel.app/" target="_blank">
              <Button variant="contained" size="large">
                Go to personal portfolio
              </Button>
            </Link>
          </Box>
          <Box
            sx={{
              minWidth: '243px',
              height: '243px',
              boxShadow: '-5px 13px',
              borderRadius: '50%',
              color: 'secondary.light',
            }}
          >
            <Image src={avatar} alt="avatar" width={243} priority />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
