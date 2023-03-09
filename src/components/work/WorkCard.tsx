import { Work } from '@/models';
import { Box, Chip, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export interface WorkcardProps {
  work: Work;
}

export function Workcard({ work }: WorkcardProps) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <Box
        width={{ xs: '100%', md: '246px' }}
        height="180px"
        position="relative"
        flexShrink={0}
        borderRadius={2}
        overflow="hidden"
      >
        <Image
          src={work.thumbnailUrl}
          alt="work thumbnail"
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 900px) 100vw, 100vw"
        />
      </Box>
      <Box>
        <Typography variant="h4" fontWeight={700}>
          {work.title}
        </Typography>
        <Stack direction="row" my={2}>
          <Chip
            color="secondary"
            label={new Date(Number(work.createdAt)).getFullYear()}
            size="small"
          />
          <Typography ml={3} color="text.secondary">
            {work.tagList.join(', ')}
          </Typography>
        </Stack>
        <Typography>{work.shortDescription}</Typography>
      </Box>
    </Stack>
  );
}
