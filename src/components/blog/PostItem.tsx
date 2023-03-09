import { Post } from '@/models';
import { Box, Divider, Typography } from '@mui/material';
import { format } from 'date-fns';
import * as React from 'react';

export interface PostItemProps {
  post: Post;
}

export function PostItem({ post }: PostItemProps) {
  return (
    <Box>
      <Typography variant="h5" fontWeight="700">
        {post.title}
      </Typography>
      <Typography component="span" variant="body1" my={2} display="flex">
        {format(new Date(post.publishedDate), 'dd MMM yyyy')}
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        {post.tagList.join(', ')}
      </Typography>
      <Typography variant="body2">{post.description}</Typography>
    </Box>
  );
}
